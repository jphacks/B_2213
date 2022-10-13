package view

import (
	"github.com/gorilla/websocket"
	"pms/src/model"
)

// User.WsConnにWriteJSONでRoomInfoを送信する
func WriteRoomInfobyWS(conn *websocket.Conn, pr *model.PokerRoom) error {
	if err := conn.WriteJSON(pr); err != nil {
		return err
	} else {
		return nil
	}
}
