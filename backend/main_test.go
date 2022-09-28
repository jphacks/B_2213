package main

import (
	"net/http/httptest"
	"net/http"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestIndex(t *testing.T) {
	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Request, _ = http.NewRequest("GET", "/", nil)
	index(c)
	if response.Code != http.StatusOK {
		t.Errorf("bad status code responded: %d", response.Code)
	}
}
