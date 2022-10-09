package controller

import (
	// "log"
	"crypto/rand"

	"pms/src/model"
	"pms/src/model/structs"
	"pms/src/view"

	"github.com/gin-gonic/gin"
	// "github.com/gorilla/websocket"
)

var PokerRooms = map[string]PokerRoom{}

func randomString(char int) string {
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	var result string

	// 乱数を生成
	b := make([]byte, char)
	_, _ = rand.Read(b)

	// letters からランダムに取り出して文字列を生成
	for _, v := range b {
		// index が letters の長さに収まるように調整
		result += string(letters[int(v)%len(letters)])
	}
	return result
}

// roomID as r
func CreatePokerRoom(r string, uid string, u User) PokerRoom {
	return PokerRoom{
		RoomID: r,
		Users: map[string]User{
			uid: u,
		},
	}
}

// HandlerFunc for POST /api/createRoom/[poker or mahjong]
func CreateRoom(c *gin.Context) {
	game := c.Param("game")
	if game != "poker" {
		view.RequestError(c, "no such game is supported in PMC: "+game)
		return
	}

	// roomID生成
	existbool := true
	var roomID string
	for existbool {
		roomID = "R" + randomString(5)
		_, existbool = PokerRooms[roomID]
	}

	// userName取得
	r := CreateRoomRequset{}
	if err := c.ShouldBindJSON(&r); err != nil {
		// log.Println(err)
		view.RequestError(c, "bad JSON")
		return
	}
	userName := r.UserName

	// UserID生成
	userID := "U" + randomString(6)

	u := User{
		UserName: userName,
		Admin:    true,
	}

	PokerRooms[roomID] = CreatePokerRoom(roomID, userID, u)

	var regres = RegisterRes{
		UserID:     userID,
		RoomID:     roomID,
		UserName:   userName,
		Permission: "admin",
	}
	res := map[string]any{
		"data": regres,
	}
	view.StatusOK(c, res)
}

// HandlerFunc for POST /api/joinRoom/[poker or mahjong]
func JoinRoom(c *gin.Context) {
	game := c.Param("game")
	if game != "poker" {
		view.RequestError(c, "no such game is supported in PMC: "+game)
		return
	}

	// roomID生成
	existbool := true
	var result string

	for existbool {
		result = "R" + randomString(5)
		_, existbool = PokerRooms[result]
	}

	// userName取得
	r := structs.RegisterJoin{}
	if err := c.ShouldBindJSON(&r); err != nil {
		// log.Println(err)
		view.RequestError(c, "bad JSON")
		return
	}

	u := model.User{
		RoomID:     r.RoomID,
		UserName:   r.UserName,
		Permission: "normal",
	}
	if err := model.CreateUser(&u); err != nil {
		view.RequestError(c, "error occured")
		return
	}

	// rms[result] = clients{}

	var resreg structs.ResRegister
	u.ResRegister(&resreg)
	res := map[string]any{
		"data": resreg,
	}
	view.StatusOK(c, res)
}
