package main

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"pms/src/controller"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type clients map[*websocket.Conn]bool

type rooms map[string](clients)

var rms rooms

func Router() *gin.Engine {
	r := gin.Default()

	r.Use(logger())

	// Cors
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	r.Use(cors.New(config))

	// ルーティング
	//routing.Routing(r)

	r.GET("/", index)

	api := r.Group("/api")
	{
		api.POST("/createRoom/:game", controller.CreateRoom)
		api.POST("/joinRoom/:game", controller.JoinRoom)
	}

	status := api.Group("/status")
	{
		status.GET("/:game", controller.GetStatus)
		status.GET("/:game/:roomID", controller.RoomStatus)
	}

	ingame := api.Group("/ingame")
	{
		ingame.GET("/ws/:roomID", controller.ConnectRoom)
		ingame.GET("/:roomID/", controller.IngameReload)
	}

	r.GET("/ws/:id", func(c *gin.Context) {
		id := c.Param("id")
		wshandlerForDemo(c.Writer, c.Request, id)
	})

	r.GET("/simpleWs", controller.SimpleWs)

	r.GET("/singleRoom", controller.CreateSingleRoom)

	return r
}

func main() {
	rms = rooms{}

	r := Router()
	_ = r.Run()
}

func logger() gin.HandlerFunc {
	return func(c *gin.Context) {
		ByteBody, _ := io.ReadAll(c.Request.Body)
		c.Request.Body = io.NopCloser(bytes.NewBuffer(ByteBody))
		log.Println("Endpoint: " + c.FullPath())
		log.Println("Body: " + string(ByteBody))

		q := c.Request.URL.Query()
		j, _ := json.Marshal(q)
		log.Println("Query Params: " + string(j))

		c.Next()
	}
}

func index(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "hi",
	})
}

func wshandlerForDemo(w http.ResponseWriter, r *http.Request, id string) {
	var wsupgrader = websocket.Upgrader{
		HandshakeTimeout: 0,
		ReadBufferSize:   1024,
		WriteBufferSize:  1024,
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	conn, err := wsupgrader.Upgrade(w, r, nil)

	if err != nil {
		log.Println("Failed to set websocket upgrade")
		return
	}
	rms[id][conn] = true
	// defer conn.Close()

	for {
		var msg message
		err := conn.ReadJSON(&msg)
		log.Println(msg.Str)
		if err != nil {
			if websocket.IsCloseError(err, 1005) {
				log.Printf("Disconnected")
			}
			log.Println("!!!")
			log.Println(err)
			rms[id][conn] = false
			return
		}
		wsWriter(msg, id)
	}
}

type message struct {
	Str  string `json:"str"`
	Int  int    `json:"int"`
	List []any  `json:"list"`
}

func wsWriter(res message, id string) {
	for client, tf := range rms[id] {
		if tf {
			if err := client.WriteJSON(res); err != nil {
				log.Println("error!!!")
				log.Println(err)
			}
		}
	}
}
