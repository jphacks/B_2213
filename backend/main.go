package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type clients map[*websocket.Conn]bool

type rooms map[string](clients)

var rms rooms

func main() {
	// DBマイグレーション
	// model.Connectionがエラー発生しなくなるまで=DBが立ち上がるまで待機
	// (docker composeで立ち上げると必ずdbのほうが立ち上がり遅い)

	//_, dbConErr := model.Connection()
	//for dbConErr != nil {
	//	time.Sleep(time.Second)
	//	_, dbConErr = model.Connection()
	//}
	//migration.Mig()
	rms = rooms{}

	r := gin.Default()

	r.Use(logger())

	// Cors
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	r.Use(cors.New(config))

	// ルーティング
	//routing.Routing(r)

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "hi",
		})
	})

	r.GET("/createRoom/:id", func(c *gin.Context) {
		id := c.Param("id")
		if _, existBool := rms[id]; existBool {
			c.JSON(400, gin.H{"message": "Room already exists"})
		} else {
			rms[id] = clients{}
			c.JSON(http.StatusOK, gin.H{"message": "Room Created!"})
		}
	})

	r.GET("/ws/:id", func(c *gin.Context) {
		id := c.Param("id")
		wshandler(c.Writer, c.Request, id)
	})

	_ = r.Run()
}

func logger() gin.HandlerFunc {
	return func(c *gin.Context) {
		ByteBody, _ := ioutil.ReadAll(c.Request.Body)
		c.Request.Body = ioutil.NopCloser(bytes.NewBuffer(ByteBody))
		log.Println("Endpoint: " + c.FullPath())
		log.Println("Body: " + string(ByteBody))

		q := c.Request.URL.Query()
		j, _ := json.Marshal(q)
		log.Println("Query Params: " + string(j))

		c.Next()
	}
}

func wshandler(w http.ResponseWriter, r *http.Request, id string) {
	var wsupgrader = websocket.Upgrader{
		HandshakeTimeout: 0,
		ReadBufferSize:   1024,
		WriteBufferSize:  1024,
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	conn, err := wsupgrader.Upgrade(w, r, nil)
	defer conn.Close()

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
				rms[id][conn] = false
				log.Printf("Disconnected")
			}
			log.Println("!!!")
			log.Println(err)
			return
		}
		wsWriter(msg, id)
	}
}

type message struct {
	Str string `json:"str"`
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
