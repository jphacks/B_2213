package controller

import (
	"github.com/gin-gonic/gin"
	"log"
	"pms/src/model"
	"pms/src/view"
)

// HnadlerFunc for GET /api/ingame/:roomID/
func IngameReload(c *gin.Context) {
	rid := c.Param("roomID")

	pr, ok := model.FindRoomByRoomID(rid)
	if !ok {
		view.RequestError(c, "RoomID is Wrong")
		return
	} else {
		view.NoContext(c)
	}
	WritePokerRoombyWS(pr)
}

// HandlerFunc for POST /api/ingame/:roomID/quitGame
func IngameQuitGame(c *gin.Context) {
	rid := c.Param("roomID")
	uid := c.Query("userID")

	pr, ok := model.FindRoomByRoomID(rid)
	if !ok {
		view.RequestError(c, "RoomID is Wrong")
		return
	}

	u, ok := pr.FindUserByUserID(uid)
	if !ok {
		view.RequestError(c, "UserID is wrong")
	}

	u.WsConn.Close()
	pr.DeleteUserByUserID(uid)
	view.StatusOK(c, gin.H{
		"message": "deleted successfully",
	})
}

// HandlerFunc For POST /api/ingame/:roomID/options
func IngameOptions(c *gin.Context) {
	rid := c.Param("roomID")
	uid := c.Query("userID")

	pr, ok := model.FindRoomByRoomID(rid)
	if !ok {
		view.RequestError(c, "RoomID is Wrong")
		return
	}

	if uid == "" {
		view.RequestUnauthorized(c, "UserID in QueryParam is required")
		return
	} else if u, ok := pr.FindUserByUserID(uid); !ok {
		view.RequestUnauthorized(c, "UserID in QueryParam is invalid")
		return
	} else if !u.Admin {
		view.RequestForbidden(c, "You are not admin")
		return
	}

	var req model.IngameActionCallRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		view.RequestError(c, "bb and sb are required in body")
	}

	pr.RoomData.SB.Amount = req.SB
	pr.RoomData.BB.Amount = req.BB

	for cuid, amount := range req.Stacks {
		u, ok := pr.FindUserByUserID(cuid)
		if !ok {
			view.RequestError(c, "no such userID in this room: "+cuid)
			return
		}
		u.Stack = amount
	}

	// Roundが0のときだけはUserのJoiningをTrueにする
	if pr.RoomData.Round == 0 {
		pr.RoomData.Round += 1
		pr.ResetRoom()
	}
	view.NoContext(c)
	WritePokerRoombyWS(pr)
}

// HandlerFunc for POST /api/ingame/:roomID/sb?userID=:userID
func IngameSB(c *gin.Context) {
	rid := c.Param("roomID")
	uid := c.Query("userID")

	// validation check
	pr, ok := model.FindRoomByRoomID(rid)
	if !ok {
		view.RequestError(c, "RoomID is Wrong")
		return
	}
	u := pr.GetUserByUserID(uid)
	if u == nil {
		view.RequestUnauthorized(c, "UserID in QueryParam is invalid")
		return
	}

	sb := pr.RoomData.SB.Amount
	if u.Stack <= sb {
		// SBがAllInしないとSBをベットできない場合
		// AllIn Flagをtrueにする
		u.BettingTips = (*u).Stack
		pr.RoomData.PotAmount += (*u).Stack
		u.Stack = 0
		pr.RoomData.SB.UserID = u.UserID
		u.AllIn = true
		u.Actioned = true
	} else {
		// 通常のSBベット
		u.BettingTips = sb
		u.Stack -= sb
		pr.RoomData.SB.UserID = u.UserID
		pr.RoomData.PotAmount += sb
	}
	if pr.RoomData.BB.UserID != "" {
		pr.RoomData.Stage = 1
	}

	if sb > pr.RoomData.RequiredPot {
		pr.RoomData.RequiredPot = sb
	}
	view.NoContext(c)
	WritePokerRoombyWS(pr)
}

// HandlerFunc for POST /api/ingame/:roomID/bb?userID=:userID
func IngameBB(c *gin.Context) {
	rid := c.Param("roomID")
	uid := c.Query("userID")

	// validation check
	pr, ok := model.FindRoomByRoomID(rid)
	if !ok {
		view.RequestError(c, "RoomID is Wrong")
		return
	}
	u := pr.GetUserByUserID(uid)
	if u == nil {
		view.RequestUnauthorized(c, "UserID in QueryParam is invalid")
		return
	}

	bb := pr.RoomData.BB.Amount
	if u.Stack <= bb {
		// BBがAllInしないとBBをベットできない場合
		// AllIn Flagをtrueにする
		u.BettingTips = (*u).Stack
		pr.RoomData.PotAmount += (*u).Stack
		u.Stack = 0
		pr.RoomData.BB.UserID = u.UserID
		u.AllIn = true
		u.Actioned = true
	} else {
		// 通常のbbベット
		u.BettingTips = bb
		u.Stack -= bb
		pr.RoomData.BB.UserID = u.UserID
		pr.RoomData.PotAmount += bb
	}
	if pr.RoomData.SB.UserID != "" {
		pr.RoomData.Stage = 1
	}

	if bb > pr.RoomData.RequiredPot {
		pr.RoomData.RequiredPot = bb
	}
	view.NoContext(c)
	WritePokerRoombyWS(pr)
}

func RoomNextRound(c *gin.Context) {
	rid := c.Param("roomID")
	// uid := c.Query("userID")

	pr, _ := model.FindRoomByRoomID(rid)

	pr.NextStage()

	view.NoContext(c)
	WritePokerRoombyWS(pr)
}

// HandlerFunc for POST /api/ingame/:roomID/fold
func IngameFold(c *gin.Context) {
	rid := c.Param("roomID")
	uid := c.Query("userID")

	// validation check
	pr, ok := model.FindRoomByRoomID(rid)
	if !ok {
		view.RequestError(c, "RoomID is Wrong")
		return
	}
	u := pr.GetUserByUserID(uid)
	if u == nil {
		view.RequestUnauthorized(c, "UserID in QueryParam is invalid")
		return
	}

	if u.BettingTips >= pr.RoomData.RequiredPot {
		// コールに必要なチップ数が0の時、コールとして扱う。
		u.Actioned = true
	} else {
		u.Joining = false
	}

	userNum := 0
	for _, u := range pr.Users {
		if !u.AllIn && u.Joining {
			userNum += 1
		}
	}

	if userNum == 1 {
		pr.RoomData.Stage = 4
		pr.NextStage()
	}

	view.NoContext(c)
	WritePokerRoombyWS(pr)
}

func IngameCall(c *gin.Context) {
	log.Println("call")
	rid := c.Param("roomID")
	uid := c.Query("userID")

	// validation check
	pr, ok := model.FindRoomByRoomID(rid)
	if !ok {
		view.RequestError(c, "RoomID is Wrong")
		return
	}
	u := pr.GetUserByUserID(uid)
	if u == nil {
		view.RequestUnauthorized(c, "UserID in QueryParam is invalid")
		return
	}

	if (u.Stack + u.BettingTips) < pr.RoomData.RequiredPot {
		u.AllIn = true
	}
	pr.RoomData.PotAmount += (pr.RoomData.RequiredPot - u.BettingTips)
	u.Stack -= (pr.RoomData.RequiredPot - u.BettingTips)
	u.BettingTips = pr.RoomData.RequiredPot
	u.Actioned = true

	allActioned := true
	for _, u := range pr.Users {
		if !u.AllIn && u.Joining {
			if !u.Actioned {
				allActioned = false
			}
		}
	}
	if allActioned {
		pr.NextStage()
	}

	view.NoContext(c)
	WritePokerRoombyWS(pr)
}
