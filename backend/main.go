package main

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"pms/src/controller"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

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
	r.GET("/cookie", func(c *gin.Context) {
		c.SetCookie("user", "user", 3600, "/", "localhost", false, false)
	})
	r.GET("checkCookie", func(c *gin.Context) {
		user, user_cookie_err := c.Cookie("user")
		if user_cookie_err != nil {
			c.JSON(401, gin.H{"message": "Cookie is null"})
		} else {
			c.JSON(200, gin.H{"message": user})
		}
	})

	ws := r.Group("/ws")
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
		ingame.GET("/:roomID/", controller.IngameReload)
		ingame.GET("/:roomID/startGame", controller.IngameStartGame)
	}

	ws.GET("/:roomID", controller.ConnectRoom)

	r.GET("/simpleWs", controller.SimpleWs)

	r.GET("/singleRoom", controller.CreateSingleRoom)

	return r
}

func main() {
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
