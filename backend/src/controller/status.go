// TODO statusを自動更新にする

package controller

import (
	"log"
	"crypto/rand"

	"pms/src/view"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type clients map[*websocket.Conn]bool

type rooms map[string](clients)

var rms = rooms{}

// HandlerFunc for GET /api/status/[poker or mahjong]
func GetStatus(c *gin.Context) {
	c.JSON(200, gin.H{
		"status": "alive",
	})
}

func CreateRoom(c *gin.Context) {
	game := c.Param("game")
	if game != "poker" {
		view.RequestError(c, "no such game is supported in PMC")
		return
	}

	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	existbool := true
	var result string

	for existbool {
		// 乱数を生成
		b := make([]byte, 5)
		rand.Read(b)

		// letters からランダムに取り出して文字列を生成
		for _, v := range b {
			// index が letters の長さに収まるように調整
			result += string(letters[int(v)%len(letters)])
		}
		_, existbool = rms[result]
		log.Println(!existbool)
	}
	rms[result] = clients{}
	var res = map[string]string{"roomID": result}
	view.StatusOK(c, res)
}
