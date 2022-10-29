package controller

import (
	"errors"
	"github.com/tokyo-azisai-paradise/poker-mahjong-calculation/src/model"
	"github.com/tokyo-azisai-paradise/poker-mahjong-calculation/src/view"

	"github.com/gin-gonic/gin"
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
	pr, u, err := ValidationCheck(c)
	if err != nil {
		return
	}

	u.WsConn.Close()
	pr.DeleteUserByUserID(u.UserID)
	view.StatusOK(c, gin.H{
		"message": "deleted successfully",
	})
	WritePokerRoombyWS(pr)
}

// HandlerFunc For POST /api/ingame/:roomID/options
func IngameOptions(c *gin.Context) {
	pr, u, err := ValidationCheck(c)
	if err != nil {
		return
	}

	if !u.Admin {
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
	pr, u, err := ValidationCheck(c)
	if err != nil {
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
	pr, u, err := ValidationCheck(c)
	if err != nil {
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
	pr, u, err := ValidationCheck(c)
	if err != nil {
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
		if u.Joining {
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
	pr, u, err := ValidationCheck(c)
	if err != nil {
		return
	}

	if (u.Stack + u.BettingTips) < pr.RoomData.RequiredPot {
		u.AllIn = true
	}
	pr.RoomData.PotAmount += (pr.RoomData.RequiredPot - u.BettingTips)
	u.Stack -= (pr.RoomData.RequiredPot - u.BettingTips)
	u.BettingTips = pr.RoomData.RequiredPot
	u.Actioned = true

	// allinがfalseでJoiningのUserが1人しかいなかったらNextRoundにしたい
	// 全員がActionedだったらNextStageにしたい
	allActioned := true
	notAllInJoining := 0
	for _, u := range pr.Users {
		if !u.AllIn && u.Joining {
			if !u.Actioned {
				allActioned = false
			}
		}
		if !u.AllIn && u.Joining {
			notAllInJoining++
		}
	}
	if notAllInJoining == 1 {
		pr.RoomData.Stage = 4
	}
	if allActioned {
		pr.NextStage()
	}

	view.NoContext(c)
	WritePokerRoombyWS(pr)
}

func IngameSelectWinner(c *gin.Context) {
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

	var req model.IngameSelectWinnerRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		view.RequestError(c, "the request doesn't have Body. Use {} for body")
	}

	if req.Winner == "" {
		view.StatusOK(c, gin.H{"winner": pr.RoomData.Winners})
		return
	} else {
		_, ok = pr.FindUserByUserID(req.Winner)
		if !ok {
			view.RequestError(c, "No such user: "+req.Winner)
			return
		} else {
			pr.RoomData.Winners = []string{req.Winner}
		}
		pr.NextRound()
		if pr.RoomData.Winners == nil {
			view.NoContext(c)
			WritePokerRoombyWS(pr)
			return
		} else {
			view.StatusOK(c, gin.H{"winner": pr.RoomData.Winners})
			WritePokerRoombyWS(pr)
			return
		}
	}
}

func IngameRaise(c *gin.Context) {
	pr, u, err := ValidationCheck(c)
	if err != nil {
		return
	}

	var req model.IngameRaiseRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		view.RequestError(c, "invalid JSON")
	}

	if req.Amount >= u.Stack {
		u.AllIn = true
		req.Amount = u.Stack
	}

	for _, us := range pr.Users {
		if !us.AllIn {
			us.Actioned = false
		}
	}

	u.Stack -= req.Amount
	u.BettingTips += req.Amount
	pr.RoomData.RequiredPot = u.BettingTips
	pr.RoomData.PotAmount += req.Amount

	u.Actioned = true

	view.NoContext(c)
	WritePokerRoombyWS(pr)
}

// gin.ContextのParamとQueryからroomIDとuserIDを取得して、レスポンスまで返す
// roomIDとuserIDが正しければエラーはnil
func ValidationCheck(c *gin.Context) (pr *model.PokerRoom, u *model.User, err error) {
	rid := c.Param("roomID")
	uid := c.Query("userID")

	err = errors.New("Valid error")

	// validation check
	pr, ok := model.FindRoomByRoomID(rid)
	if !ok {
		view.RequestError(c, "RoomID is Wrong")
		return
	}
	u = pr.GetUserByUserID(uid)
	if u == nil {
		view.RequestUnauthorized(c, "UserID in QueryParam is invalid")
		return
	}
	err = nil
	return
}
