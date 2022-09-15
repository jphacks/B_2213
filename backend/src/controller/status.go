// TODO statusを自動更新にする

package controller

import (
	"github.com/gin-gonic/gin"
)

// HandlerFunc for GET /api/status/[poker or mahjong]
func GetStatus(c *gin.Context) {
	c.JSON(200, gin.H{
		"status": "alive",
	})
}