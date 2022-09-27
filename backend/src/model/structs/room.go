package structs

// createRoom, joinRoom用のrequest時のstruct
type Register struct {
	UserName string `json:"userName" binding:"required"`
}

// createRoom, joinRoomのレスポンス時のstruct
type ResRegister struct {
	UserID     string `json:"userID"`
	RoomID     string `json:"roomID"`
	UserName   string `json:"userName"`
	Permission string `json:"permission"`
}

type RegisterJoin struct {
	UserName string `json:"userName" binding:"required"`
	RoomID   string `json:"roomID" binding:"required"`
}
