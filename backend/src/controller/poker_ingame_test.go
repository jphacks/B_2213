package controller

import (
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
