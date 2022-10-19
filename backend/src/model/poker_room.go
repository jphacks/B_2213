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
		u.BettingTips = 0
	}

	// ステージが5の場合、ラウンド終了処理を起動する
	pr.RoomData.Stage += 1
	if pr.RoomData.Stage >= 5 {
		log.Println("NextStage()から終了処理を呼び出す")
		pr.NextRound()
		// Roundをすすめる
		pr.RoomData.Round += 1
		pr.RoomData.Stage = 0
		pr.RoomData.RequiredPot = 0
		pr.RoomData.PotAmount = 0
		pr.RoomData.Winners = nil
		pr.RoomData.SB.UserID = ""
		pr.RoomData.BB.UserID = ""

		for _, u := range pr.Users {
			u.Joining = true
			u.AllIn = false
			u.Actioned = false
			u.PotAmount = 0
		}
	}
}

// 勝敗判定が必要なところをフロントエンドに渡す
func (pr *PokerRoom) NextRound() {
	if winners := pr.RoomData.Winners; winners != nil && len(winners) != 1 {
		pr.CollectChips(winners[0])
		pr.NextRound()
		return
	} else if winners != nil {
	} else {
		log.Println("winners is nil")
		winners = []string{}
		for uid, u := range pr.Users {
			if u.Joining {
				log.Println("appending user for winners")
				winners = append(winners, uid)
			}
		}
		log.Println(len(winners))
		if len(winners) == 1 {
			if pr.GetUserByUserID(winners[0]).PotAmount == 0 {
				return
			}
			pr.CollectChips(winners[0])
			pr.NextRound()
			return
		} else if len(winners) == 0 {
			log.Println("no winners")
			return
		} else {
			pr.RoomData.Winners = winners
		}
	}

	log.Println(pr)
	log.Println(pr.RoomData)
	// } else if pr.RoomData.Winners != nil &&
}

// すべてのUserからuidのUserにPotAmountを没収する
// ただ、uidのPotAmount以上は取らない
func (pr *PokerRoom) CollectChips(uid string) {
	winner := pr.GetUserByUserID(uid)
	maxCollection := pr.GetUserByUserID(uid).PotAmount
	for _, u := range pr.Users {
		if u.PotAmount > maxCollection {
			u.PotAmount -= maxCollection
			winner.Stack += maxCollection
		} else {
			winner.Stack += u.PotAmount
			u.PotAmount = 0
		}
	}
}
