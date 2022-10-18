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
	RequiredPot int   `json:"toCall"` // このラウンドでコールするのに必要なチップ数
	SB          Blind `json:"sb"`
	BB          Blind `json:"bb"`
	PotAmount   int   `json:"pot"` // ゲーム画面に表示される賭けられてるチップの合計
}

type Blind struct {
	UserID string `json:"user"`
	Amount int    `json:"amount"`
}

type User struct {
	UserName     string          `json:"userName"`
	UserID       string          `json:"-"`
	Stack        int             `json:"stack"`
	Joining      bool            `json:"joining"`
	BettingTips  int             `json:"bettingTips"`  // このラウンドで賭けたチップ
	AllIn        bool            `json:"allIn"`        // オールインフラグ
	Actioned     bool            `json:"actioned"`     // アクションが済んだかのフラグ 全員がTrueならRound進行の関数を実行してBettingTipsを内部のPotに移動して
	Admin        bool            `json:"admin"`        // 設定が使用できるかのフラグ
	SessionAlive bool            `json:"sessionAlive"` // 落ちてるかどうかのフラグ
	WsConn       *websocket.Conn `json:"-"`
	PotAmount    int             `json:"potAmount"` // Potに入れた金額 ラウンド終了時に全員から回収できる金額はこの値以下となる
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
