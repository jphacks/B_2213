package controller

import (
	"log"
	"net/http"
	"pms/src/model"
	"pms/src/view"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var wsupgrader = websocket.Upgrader{
	HandshakeTimeout: 0,
	ReadBufferSize:   1024,
	WriteBufferSize:  1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// HandlerFunc for WS /ws/:roomID
func ConnectRoom(c *gin.Context) {
	roomID := c.Param("roomID")
	userID := c.Query("userID")
	if _, ok := model.FindRoomByRoomID(roomID); !ok {
		view.RequestError(c, "RoomID is Wrong")
		return
	}
	WebSocketServer(c.Writer, c.Request, roomID, userID)
}

// main part of ConnectRoom()
func WebSocketServer(w http.ResponseWriter, r *http.Request, rid string, uid string) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Failed to set websocket upgrade")
		return
	}
	pr, _ := model.FindRoomByRoomID(rid)
	user := pr.GetUserByUserID(uid)
	(*user).WsConn = conn
	(*user).SessionAlive = true
	WritePokerRoombyWS(pr)
	for {
		if _, _, err := conn.ReadMessage(); err != nil {
			if websocket.IsCloseError(err, 1005) {
				log.Printf("Disconnected")
			} else {
				log.Println("!!!")
				log.Println(err)
				(*user).WsConn = nil
				(*user).SessionAlive = false
			}
			conn.Close()
			WritePokerRoombyWS(pr)
			return
		}
	}
}

// PokerRoomの全てのUserにPokerRoomをJSONで送信
func WritePokerRoombyWS(pr *model.PokerRoom) {
	for _, u := range pr.Users {
		if u.WsConn == nil {
			// WsConnがnilでWriteJSONするとぬるぽ吐くので振り分け
		} else if err := view.WriteRoomInfobyWS(u.WsConn, pr); err != nil {
			u.WsConn.Close()
			u.WsConn = nil
			u.SessionAlive = false
		}
	}
}
