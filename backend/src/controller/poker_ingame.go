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

type message struct {
	Str  string `json:"str"`
	Int  int    `json:"int"`
	List []any  `json:"list"`
}

// HandlerFunc for ws://~~~~:8000/simpleWs
func SimpleWs(c *gin.Context) {
	wshandler(c.Writer, c.Request)
}

// main function of websocket
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

var singleRoom = PokerRoom{
	RoomID: "DAMMY",
}

func CreateSingleRoom(c *gin.Context) {
	c.JSON(200, singleRoom)
}

func ConnectRoom(c *gin.Context) {
	roomID := c.Param("roomID")
	if _, ok := pr[roomID]; !ok {
		view.RequestError(c, "RoomID is Wrong")
		return
	}
	WebSocketServer(c.Writer, c.Request, roomID)
}

func WebSocketServer(w http.ResponseWriter, r *http.Request, rid string) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Failed to set websocket upgrade")
		return
	}
	pr[rid].WsCons[conn] = true
	for {
		var msg message
		if err := conn.ReadJSON(&msg); err != nil {
			if websocket.IsCloseError(err, 1005) {
				log.Printf("Disconnected")
			}
			log.Println("!!!")
			log.Println(err)
			pr[rid].WsCons[conn] = false
			return
		}

	}
}

func (pr *PokerRooms) WritePokerRoomtoWS(rid string) {
	for conn, alive := range (*pr)[rid].WsCons {
		if alive {
			go func(con *websocket.Conn) {
				err := WriteJSONtoWS(con, (*pr)[rid])
				if err != nil {
					(*pr)[rid].WsCons[conn] = false
				}
			}(conn)
		}
	}
}

func WriteJSONtoWS(conn *websocket.Conn, a any) error {
	err := conn.WriteJSON(a)
	return err
}

func IngameReload(c *gin.Context) {
	roomID := c.Param("roomID")
	if _, ok := pr[roomID]; !ok {
		view.RequestError(c, "RoomID is Wrong")
		return
	}

	view.NoContext(c)
	pr.WritePokerRoomtoWS(roomID)
}
