// TODO statusを自動更新にする

package controller

import (
	"pms/src/view"

	"github.com/gin-gonic/gin"
)

// HandlerFunc for GET /api/status/[poker or mahjong]
func GetStatus(c *gin.Context) {
	c.JSON(200, gin.H{
		"status": "alive",
	})
}

func RoomStatus(c *gin.Context) {
	game := c.Param("game")
	roomID := c.Param("roomID")
	if game != "poker" {
		view.RequestError(c, "no such game is supported in PMC")
		return
	}
	_, existbool := PokerRooms[roomID]
	if existbool {
		res := map[string]string{"status": "waiting"}
		view.StatusOK(c, res)
	} else {
		res := map[string]string{"status": "finished"}
		view.StatusOK(c, res)
	}
}
