package view

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// 400 BadRequest
func RequestError(c *gin.Context, msg string) {
	c.JSON(http.StatusBadRequest, gin.H{
		"message": msg,
	})
	log.Println(msg)
}

// 401 Unauthorized
func RequestUnauthorized(c *gin.Context, msg string) {
	c.JSON(http.StatusUnauthorized, gin.H{
		"message": msg,
	})
	log.Println(msg)
}

// 403 Forbidden
func RequestForbidden(c *gin.Context, msg string) {
	c.JSON(http.StatusForbidden, gin.H{
		"message": msg,
	})
	log.Println(msg)
}
