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

// HandlerFunc For POST /api/ingame/:roomID/call
func IngameActionCall(c *gin.Context) {}

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
	view.NoContext(c)
	WritePokerRoombyWS(pr)
}

// HandlerFunc for POST /api/ingame/:roomID/sb?userID=:userID
func IngameSB(c *gin.Context) {
	rid := c.Param("roomID")
	uid := c.Query("userID")

	// validation check
	pr, ok := model.FindRoomByRoomID(rid)
	log.Println(ok)
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
	if (*u).Stack <= sb {
		// SBがAllInしないとSBをベットできない場合
		// AllIn Flagをtrueにする

	} else {
		// 通常のSBベット
		(*u).BettingTips = sb
		(*u).Stack -= sb
	}
	view.NoContext(c)
	WritePokerRoombyWS(pr)
}
