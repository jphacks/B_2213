package model

import (
	"errors"
	"log"
	// "github.com/gorilla/websocket"
)

var PR PokerRooms

func ResetPokerRooms() {
	PR = PokerRooms{}
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
			SB: Blind{"", 50},
			BB: Blind{"", 100},
		},
		Users: map[string]*User{
			uid: u,
		},
	}
	return PR[rid], nil
}

func (pr *PokerRoom) AddUser(uid string, u *User) error {
	_, ok := pr.FindUserByUserID(uid)
	if ok {
		return errors.New("UserID is already taken")
	} else {
		pr.Users[uid] = u
		return nil
	}
}

func (pr *PokerRoom) FindUserByUserID(uid string) (*User, bool) {
	u, ok := pr.Users[uid]
	return u, ok
}

func (pr *PokerRoom) GetUserByUserID(uid string) *User {
	u, ok := pr.Users[uid]
	if ok {
		return u
	} else {
		return nil
	}
}

func (pr *PokerRoom) DeleteUserByUserID(uid string) {
	delete(pr.Users, uid)
}

// JoiningがtrueかつAllInがfalseユーザーのActionedをfalseに変える Round進行
func (pr *PokerRoom) ResetAllUserActioned() {
	for _, u := range pr.Users {
		if !u.AllIn {
			u.Actioned = false
		}
	}
}

func (pr *PokerRoom) NextStage() {
	pr.ResetAllUserActioned()

	for _, u := range pr.Users {
		u.PotAmount += u.BettingTips
	}

	pr.RoomData.Stage += 1
	if pr.RoomData.Stage >= 5 {
		// 終了処理(チップをストックに移動する)
		log.Println("終了処理")
	}
}

//
// func (pr *PokerRoom)
