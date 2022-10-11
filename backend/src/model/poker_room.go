package model

import (
	"errors"
	"github.com/gorilla/websocket"
)

var PR PokerRooms

func ResetPokerRooms() {
	PR = PokerRooms{}
}

func (pr *PokerRoom) UpdateUser(id string, uid string, u *User) {}

// PokerRoom内にいる全てのユーザーのWsConnを取得する
func (pr *PokerRoom) GetAllUserWebSockets() []*websocket.Conn {
	res := []*websocket.Conn{}
	for _, u := range pr.Users {
		res = append(res, u.WsConn)
	}
	return res
}

func (pr *PokerRoom) AddUser(uid string, u * User) error{
	_, ok := pr.FindUserByUserID(uid)
	if ok {
		return errors.New("UserID is already taken")
	} else {
		pr.Users[uid] = *u
		return nil
	}
}

// PokerRoomsからroomIDを用いてPokerRoomを取得する
func FindRoomByRoomID(rid string) (*PokerRoom, bool) {
	pr, ok := PR[rid]
	return pr, ok
}

// roomID as rid, userID as uid and User as u
func CreatePokerRoom(rid string, uid string, u *User) (*PokerRoom, error) {
	if _, ok := FindRoomByRoomID(rid); ok {
		return nil, errors.New("RoomID is already taken")
	}
	PR[rid] = &PokerRoom{
		RoomID: rid,
		RoomData: RoomData{
			SB: 50,
			BB: 100,
		},
		Users: map[string]User{
			uid: *u,
		},
	}
	return PR[rid], nil
}

func (pr *PokerRoom) FindUserByUserID(uid string) (*User, bool) {
	u, ok := pr.Users[uid]
	return &u, ok
}
