package controller

import (
	"github.com/gorilla/websocket"
	"log"
	"crypto/rand"

	"pms/src/view"

	"github.com/gin-gonic/gin"
)

type PokerRooms map[string]*PokerRoom

var pr = PokerRooms{}

func (pr *PokerRooms) AddUser(rid string, uid string, u *User) {
	(*pr)[rid].Users[uid] = *u
}

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

// roomID as rid, userID as uid and User as u
func CreatePokerRoom(rid string, uid string, u User) PokerRoom {
	return PokerRoom{
		RoomID: rid,
		Users: map[string]User{
			uid: u,
		},
		WsCons: map[*websocket.Conn]bool{},
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
		_, existbool = pr[roomID]
	}

	// userName取得
	r := CreateRoomRequest{}
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
	room := CreatePokerRoom(roomID, userID, u)
	pr[roomID] = &room

	pr.AddUser(roomID, userID, &u)


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
	log.Println(pr[roomID])
}

// HandlerFunc for POST /api/joinRoom/[poker or mahjong]
func JoinRoom(c *gin.Context) {
	game := c.Param("game")
	if game != "poker" {
		view.RequestError(c, "no such game is supported in PMC: "+game)
		return
	}

	// userName, roomID取得
	r := JoinRoomRequest{}
	if err := c.ShouldBindJSON(&r); err != nil {
		// log.Println(err)
		view.RequestError(c, "bad JSON")
		return
	}
	roomID := r.RoomID
	userName := r.UserName

	// RoomID確認
	if _, ok := pr[roomID]; !ok {
		view.RequestError(c, "no such Room")
	}

	// userID生成・重複確認
	var userID string
	for duplicated := true; duplicated; {
		userID = "R" + randomString(5)
		_, duplicated = pr[roomID].Users[userID]
	}

	u := User{
		UserName: userName,
		Admin:    false,
	}
	pr.AddUser(roomID, userID, &u)

	var regres = RegisterRes{
		UserID:     userID,
		RoomID:     roomID,
		UserName:   userName,
		Permission: "normal",
	}
	res := map[string]any{
		"data": regres,
	}
	view.StatusOK(c, res)
	log.Println(pr[roomID])
}
