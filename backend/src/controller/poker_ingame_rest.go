package controller

import (
	"github.com/gin-gonic/gin"
	"pms/src/view"
)

// HnadlerFunc for GET /api/ingame/:roomID/
func IngameReload(c *gin.Context) {
	roomID := c.Param("roomID")
	if _, ok := pr[roomID]; !ok {
		view.RequestError(c, "RoomID is Wrong")
		return
	}

	view.NoContext(c)
	pr[roomID].WritePokerRoomtoWS()
}

// HnadlerFunc for GET /api/ingame/:roomID/StartGame
func IngameStartGame(c *gin.Context) {
	rid := c.Param("roomID")
	if _, ok := pr[rid]; !ok {
		view.RequestError(c, "RoomID is Wrong")
		return
	}

	room := (pr[rid])
	uid := c.Query("userID")
	if uid == "" {
		view.RequestUnauthorized(c, "UserID in QueryParam is required")
		return
	} else if _, ok := room.Users[uid]; !ok {
		view.RequestUnauthorized(c, "UserID in QueryParam is invalid")
		return
	} else if !room.Users[uid].Admin {
		view.RequestForbidden(c, "You are not admin")
		return
	}

	room.RoomData.Round = 1

	view.NoContext(c)
	room.WritePokerRoomtoWS()
}
