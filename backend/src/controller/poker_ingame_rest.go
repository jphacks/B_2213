package controller

import (
	"github.com/gin-gonic/gin"
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

// HnadlerFunc for GET /api/ingame/:roomID/StartGame
func IngameStartGame(c *gin.Context) {
	rid := c.Param("roomID")
	uid := c.Query("userID")

	pr, ok := model.FindRoomByRoomID(rid)
	if !ok {
		view.RequestError(c, "RoomID is Wrong")
		return
	}

	room := (pr)
	if uid == "" {
		view.RequestUnauthorized(c, "UserID in QueryParam is required")
		return
	} else if u, ok := room.FindUserByUserID(uid); !ok {
		view.RequestUnauthorized(c, "UserID in QueryParam is invalid")
		return
	} else if !u.Admin {
		view.RequestForbidden(c, "You are not admin")
		return
	}

	room.RoomData.Round = 1

	view.NoContext(c)
	WritePokerRoombyWS(pr)
}
