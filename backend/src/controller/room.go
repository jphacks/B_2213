package controller

import (
	// "log"
	"crypto/rand"

	"pms/src/model"
	"pms/src/model/structs"
	"pms/src/view"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type clients map[*websocket.Conn]bool

type rooms map[string](clients)

var rms = rooms{}

func randomString(char int) string {
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	var result string

	// 乱数を生成
	b := make([]byte, char)
	rand.Read(b)

	// letters からランダムに取り出して文字列を生成
	for _, v := range b {
		// index が letters の長さに収まるように調整
		result += string(letters[int(v)%len(letters)])
	}
	return result
}

// HandlerFunc for POST /api/createRoom/[poker or mahjong]
func CreateRoom(c *gin.Context) {
	game := c.Param("game")
	if game != "poker" {
		view.RequestError(c, "no such game is supported in PMC")
		return
	}

	// roomID生成
	existbool := true
	var roomID string

	for existbool {
		roomID = "R" + randomString(5)
		_, existbool = rms[roomID]
	}

	// userName取得
	r := structs.Register{}
	c.BindJSON(&r)

	u := model.User{
		RoomID:     roomID,
		UserName:   r.UserName,
		Permission: "admin",
	}
	if err := model.CreateUser(&u); err != nil {
		view.RequestError(c, "error occured")
	}

	rms[roomID] = clients{}

	var resreg structs.ResRegister
	u.ResRegister(&resreg)
	res := map[string]any{
		"data": resreg,
	}
	view.StatusOK(c, res)
}

// HandlerFunc for POST /api/joinRoom/[poker or mahjong]
func JoinRoom(c *gin.Context) {
	game := c.Param("game")
	if game != "poker" {
		view.RequestError(c, "no such game is supported in PMC")
		return
	}

	// roomID生成
	existbool := true
	var result string

	for existbool {
		result = "R" + randomString(5)
		_, existbool = rms[result]
	}

	// userName取得
	r := structs.RegisterJoin{}
	c.BindJSON(&r)

	u := model.User{
		RoomID:     r.RoomID,
		UserName:   r.UserName,
		Permission: "normal",
	}
	if err := model.CreateUser(&u); err != nil {
		view.RequestError(c, "error occured")
	}

	rms[result] = clients{}

	var resreg structs.ResRegister
	u.ResRegister(&resreg)
	res := map[string]any{
		"data": resreg,
	}
	view.StatusOK(c, res)
}
