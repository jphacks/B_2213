package view

import (
	// "github.com/gorilla/websocket"
	"pms/src/model"
)

func WriteJSON(pr *model.PokerRoom) {
	users := pr.Users
	for uid, u := range users {
		if err := u.WsConn.WriteJSON(pr); err != nil {

			users[uid].WsConn = nil
			users[uid].SessionAlive = false
		}
	}
}

func WriteRoomInfoByWS(pr *model.PokerRoom, u *model.User) error {
	conn := u.WsConn
	if err := conn.WriteJSON(pr) ; err != nil {
		return err
	} else {
		return nil
	}
}
