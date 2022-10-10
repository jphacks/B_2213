package view

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// 200 OK
func StatusOK(c *gin.Context, msg any) {
	c.JSON(http.StatusOK, msg)
}

// 204 NoContext
func NoContext(c *gin.Context) {
	c.AbortWithStatus(204)
}
