package model

import (
	"github.com/gorilla/websocket"
)

type PokerRooms map[string]*PokerRoom

// CreateRoom時のリクエストのStruct
type CreateRoomRequest struct {
	UserName string `json:"userName"`
}

type PokerRoom struct {
	RoomID   string           `json:"roomId"`
	RoomData RoomData         `json:"roomData"`
	Users    map[string]*User `json:"users"`
}

type RoomData struct {
	Round       int   `json:"round"`
	Stage       int   `json:"stage"`
	RequiredPot int   `json:"toCall"`
	SB          Blind `json:"sb"`
	BB          Blind `json:"bb"`
	Pot         Pot   `json:"pot"`
}

type Blind struct {
	UserID string `json:"user"`
	Amount int    `json:"amount"`
}

type Pot struct {
	Main int      `json:"main"`
	Sub  []Subpot `json:"sub"`
}

type Subpot struct {
	Tips  int      `json:"tips"`
	Users []string `json:"users"`
}

type User struct {
	UserName     string          `json:"userName"`
	UserID       string          `json:"-"`
	Stack        int             `json:"stack"`
	Joining      bool            `json:"joining"`
	BettingTips  int             `json:"bettingTips"`
	AllIn        bool            `json:"allIn"`
	Actioned     bool            `json:"actioned"`
	Admin        bool            `json:"admin"`
	SessionAlive bool            `json:"sessionAlive"`
	WsConn       *websocket.Conn `json:"-"`
}

// CreateRoom, JoinRoomのレスポンスのStruct
type RegisterRes struct {
	UserID     string `json:"userID"`
	RoomID     string `json:"roomID"`
	UserName   string `json:"userName"`
	Permission string `json:"permission"`
}

// JoinRoomのリクエストのStruct
type JoinRoomRequest struct {
	UserName string `json:"userName"`
	RoomID   string `json:"roomId"`
}

type IngameActionCallRequest struct {
	Stacks map[string]int `json:"stacks"`
	BB     int            `json:"BB" binding:"required"`
	SB     int            `json:"SB" binding:"required"`
}
