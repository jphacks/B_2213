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
	pr.WritePokerRoomtoWS(roomID)
}
