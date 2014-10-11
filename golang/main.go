package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/garyburd/redigo/redis"
)

const ch = "count"

func main() {
	c, err := redis.Dial("tcp", ":6379")
	if err != nil {
		panic(err)
	}

	count := 852

	http.HandleFunc("/count", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "%d", count)
	})

	http.HandleFunc("/count_up", func(w http.ResponseWriter, r *http.Request) {
		count++
		c.Do("PUBLISH", ch, count)
	})

	log.Fatal(http.ListenAndServe(":8080", nil))
}
