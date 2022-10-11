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

type message struct {
	Str  string `json:"str"`
	Int  int    `json:"int"`
	List []any  `json:"list"`
}

// テストコード用のWS
func wshandler(w http.ResponseWriter, r *http.Request) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Failed to set websocket upgrade")
		return
	}
	for {
		var msg message
		err := conn.ReadJSON(&msg)
		if err != nil {
			if websocket.IsCloseError(err, 1005, 1006) {
				log.Printf("Websocket Error detected but ignored")
			} else {
				log.Panic(err)
			}
			return
		}
		if err := conn.WriteJSON(&msg); err != nil {
			log.Panic(err)
			return
		}
	}
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
	user.WsConn = conn
	user.SessionAlive = true
	WritePokerRoombyWS(pr)
	for {
		if _, _, err := conn.ReadMessage(); err != nil {
			if websocket.IsCloseError(err, 1005) {
				log.Printf("Disconnected")
			} else {
				log.Println("!!!")
				log.Println(err)
				user.WsConn = nil
				user.SessionAlive = false
			}
			conn.Close()
			return
		}
	}
}

// PokerRoomの全てのUserにPokerRoomをJSONで送信
func WritePokerRoombyWS(pr *model.PokerRoom) {
	for uid, u := range pr.Users {
		if u.WsConn == nil {
			// WsConnがnilでWriteJSONするとぬるぽ吐くので振り分け
		} else if err := view.WriteRoomInfoByWS(pr, u); err != nil {
			pr.Users[uid].WsConn.Close()
			pr.Users[uid].WsConn = nil
			pr.Users[uid].SessionAlive = false
		}
	}
}
