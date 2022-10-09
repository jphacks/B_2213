package controller

// CreateRoom時のStruct
type Register struct {
	UserName string `json:"userName"`
}

type PokerRoom struct {
	RoomID   string          `json:"roomId"`
	RoomData RoomData        `json:"roomData"`
	Users    map[string]User `json:"users"`
}

type RoomData struct {
	Round int `json:"round"`
	Stage int `json:"stage"`
	Pot   Pot `json:"pot"`
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
	UserName    string `json:"userName"`
	Stack       int    `json:"stack"`
	Joining     bool   `json:"joining"`
	BettingTips int    `json:"bettingTips"`
	AllIn       bool   `json:"allIn"`
	Actioned    bool   `json:"actioned"`
	Admin       bool   `json:"admin"`
}

type RegisterRes struct {
	UserID     string `json:"userID"`
	RoomID     string `json:"roomID"`
	UserName   string `json:"userName"`
	Permission string `json:"permission"`
}
