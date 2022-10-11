package controller

import (
	"crypto/rand"
	"pms/src/model"
	"pms/src/view"

	"github.com/gin-gonic/gin"
)

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
		_, existbool = model.FindRoomByRoomID(roomID)
	}

	// userName取得
	r := model.CreateRoomRequest{}
	if err := c.ShouldBindJSON(&r); err != nil {
		view.RequestError(c, "bad JSON")
		return
	}
	userName := r.UserName

	// UserID生成
	userID := "U" + randomString(6)

	u := model.User{
		UserName: userName,
		Admin:    true,
	}
	_, err := model.CreatePokerRoom(roomID, userID, &u)
	if err != nil {
		view.InternalServerError(c, "Something error has occured while creating PokerRoom")
	}

	var regres = model.RegisterRes{
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

	// userName, roomID取得
	r := model.JoinRoomRequest{}
	if err := c.ShouldBindJSON(&r); err != nil {
		view.RequestError(c, "bad JSON")
		return
	}
	roomID := r.RoomID
	userName := r.UserName

	// RoomID確認
	pr, ok := model.FindRoomByRoomID(roomID)
	if !ok {
		view.RequestError(c, "no such Room")
		return
	}

	// userID生成・重複確認
	var userID string
	for duplicated := true; duplicated; {
		userID = "U" + randomString(5)
		_, duplicated = pr.FindUserByUserID(userID)
	}

	u := model.User{
		UserName: userName,
		Admin:    false,
	}
	err := pr.AddUser(userID, &u)
	if err != nil {
		view.InternalServerError(c, "Something error has occured while creating PokerRoom")
	}

	var regres = model.RegisterRes{
		UserID:     userID,
		RoomID:     roomID,
		UserName:   userName,
		Permission: "normal",
	}
	res := map[string]any{
		"data": regres,
	}
	view.StatusOK(c, res)
	// TODO
	WritePokerRoombyWS(pr)
}
