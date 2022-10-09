package controller

import (
	"log"
	"net/http"
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

// TODO Mock
type message struct {
	Str  string `json:"str"`
	Int  int    `json:"int"`
	List []any  `json:"list"`
}

// TODO mock
// HandlerFunc for ws://~~~~:8000/simpleWs
func SimpleWs(c *gin.Context) {
	wshandler(c.Writer, c.Request)
}

// TODO mock
// main function of SimpleWs
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

// TODO Mock
var singleRoom = PokerRoom{
	RoomID: "DAMMY",
}

// TODO Mock
func CreateSingleRoom(c *gin.Context) {
	c.JSON(200, singleRoom)
}

func (pr *PokerRooms) UpdateUser(id string, uid string, u *User) {}

// HandlerFunc for WS /ws/:roomID
func ConnectRoom(c *gin.Context) {
	roomID := c.Param("roomID")
	userID := c.Query("userID")
	if _, ok := pr[roomID]; !ok {
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
	pr[rid].Users[uid].WsCons = conn
	pr[rid].Users[uid].SessionAlive = true
	pr.WritePokerRoomtoWS(rid)
	for {
		var msg message
		if err := conn.ReadJSON(&msg); err != nil {
			if websocket.IsCloseError(err, 1005) {
				log.Printf("Disconnected")
			} else {
				log.Println("!!!")
				log.Println(err)
				pr[rid].Users[uid].WsCons = nil
				pr[rid].Users[uid].SessionAlive = false
			}
			conn.Close()
			return
		}
	}
}

// PokerRooms[rid]の全てにPokerRoomをJSONで送信
func (pr *PokerRooms) WritePokerRoomtoWS(rid string) {
	for uid, conn := range (*pr)[rid].Users {
		if conn.WsCons != nil {
			err := conn.WsCons.WriteJSON((*pr)[rid])
			if err != nil {
				(*pr)[rid].Users[uid].WsCons = nil
				(*pr)[rid].Users[uid].SessionAlive = false
			}
		}
	}
}
