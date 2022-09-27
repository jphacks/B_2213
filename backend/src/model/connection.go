package model

import (
	"fmt"
	"os"

	"errors"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func Connection() (*gorm.DB, error) {
	rootPass := os.Getenv("MYSQL_ROOT_PASSWORD")
	database := os.Getenv("MYSQL_DATABASE")
	dsn := fmt.Sprintf("root:%s@tcp(db:3306)/%s?charset=utf8&parseTime=True&loc=Local", rootPass, database)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		return nil, errors.New("Connection falied")
	}
	return db, nil
}

func Migration() {

}
