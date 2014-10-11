package main

import (
	"net/http"

	"github.com/garyburd/redigo/redis"
)

const ch = "count"

func main() {
	c, err := redis.Dial("tcp", ":6379")
	if err != nil {
		panic(err)
	}

	count := 0

	http.HandleFunc("/count_up", func(w http.ResponseWriter, r *http.Request) {
		count++
		c.Do("PUBLISH", ch, count)
	})

	http.ListenAndServe(":8080", nil)
}
