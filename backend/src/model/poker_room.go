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
	rd := &RoomData{
		SB: Blind{"", 50},
		BB: Blind{"", 100},
	}
	PR[rid] = &PokerRoom{
		RoomID:   rid,
		RoomData: rd,
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

// ステージ進行処理
func (pr *PokerRoom) NextStage() {
	pr.ResetAllUserActioned()

	for _, u := range pr.Users {
		u.PotAmount += u.BettingTips
	}

	// ステージが5の場合、ラウンド終了処理を起動する
	pr.RoomData.Stage += 1
	if pr.RoomData.Stage >= 5 {
		log.Println("終了処理")
		pr.NextRound()
	}
}

// 勝敗判定が必要なところをフロントエンドに渡す
func (pr *PokerRoom) NextRound() {
	// 勝敗判定が必要なところをフロントエンドに渡す
	joiningUsers := 0
	for _, u := range pr.Users {
		if u.Joining {
			joiningUsers += 1
		}
	}

	if joiningUsers == 1 {
		
	}
}
