package controller

import (
	"log"
	"net/http"
	"strings"
	// "github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"net/http/httptest"
	"testing"
)

func TestWsHandler(t *testing.T) {
	r := httptest.NewServer(http.HandlerFunc(wshandler))
	defer r.Close()
	wsURL := "ws" + strings.TrimPrefix(r.URL, "http") + "/simpleWs"
	log.Println(wsURL)

	ws, _, err := websocket.DefaultDialer.Dial(wsURL, nil)
	if err != nil {
		t.Fatalf("%v", err)
	}
	defer ws.Close()

	// Send message to server, read response and check to see if it's what we expect.
	var res message
	for i := 0; i < 10; i++ {
		if err := ws.WriteJSON(message{Str: "asdf"}); err != nil {
			t.Fatalf("%v", err)
		}
		res = message{}
		err := ws.ReadJSON(&res)
		if err != nil {
			t.Fatalf("%v", err)
		}
		if res.Str != "asdf" {
			t.Fatalf("bad message")
		}
	}
}
