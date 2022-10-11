package model

import (
	"log"
	"testing"
)

func TestFindRoomByRoomID(t *testing.T) {
	PR = PokerRooms{
		"a": PokerRoom{},
	}
	cases := []struct {
		roomID string
		tf     bool
	}{
		{
			roomID: "a",
			tf:     true,
		}, {
			roomID: "b",
			tf:     false,
		},
	}
	for _, c := range cases {
		r, res := FindRoomByRoomID(c.roomID)
		log.Println(r)
		log.Println(res)
		if c.tf != res {
			t.Errorf("Test Missed at case %s", c.roomID)
		}
	}
}
