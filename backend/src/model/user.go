package model

import (
	"pms/src/model/structs"
	"strconv"
)

type User struct {
	UserID     int    `json:"userID" gorm:"primaryKey"`
	RoomID     string `json:"roomID" gorm:"not null"`
	UserName   string `json:"userName" gorm:"not null"`
	Permission string `json:"permission" gorm:"not null"`
	Cookie     string
}

// User to ResRegister
func (u *User) ResRegister(r *structs.ResRegister) {
	r.UserID = "U" + strconv.Itoa(u.UserID)
	r.RoomID = u.RoomID
	r.UserName = u.UserName
	r.Permission = u.Permission
	for len(r.UserID) <= 6 {
		r.UserID = "U" + "0" + r.UserID[1:]
	}
}

func CreateUser(u *User) error {
	db, err := Connection()
	if err != nil {
		return err
	}
	db.Debug().Create(u)
	return nil
}
