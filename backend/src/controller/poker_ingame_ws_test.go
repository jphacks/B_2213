package controller

import (
	"log"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gorilla/websocket"
)

func TestBaseWs(t *testing.T) {
	testCases := []message{
		{
			Str: "1",
		}, {
			Str: "2",
		}, {
			Str: "3",
		},
	}
	for _, testCase := range testCases {
		r := httptest.NewServer(http.HandlerFunc(wshandler))
		defer r.Close()
		wsURL := "ws" + strings.TrimPrefix(r.URL, "http") + "/simpleWs"

		ws, _, err := websocket.DefaultDialer.Dial(wsURL, nil)
		if err != nil {
			t.Fatalf("%v", err)
		}
		defer ws.Close()

		// Send message to server, read response and check to see if it's what we expect.
		var res message
		for i := 0; i < 10; i++ {
			if err := ws.WriteJSON(testCase); err != nil {
				t.Fatalf("%v", err)
			}
			res = message{}
			err := ws.ReadJSON(&res)
			if err != nil {
				t.Fatalf("%v", err)
			}
			if res.Str != testCase.Str {
				t.Fatalf("bad message")
			}
		}
	}
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
