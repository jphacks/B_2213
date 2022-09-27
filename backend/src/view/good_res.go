package view

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func StatusOK(c *gin.Context, msg any) {
	c.JSON(http.StatusOK, msg)
}
