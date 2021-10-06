package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type Menu struct {
	Name  string `json:"name"`
	Eaten bool   `json:"eaten"`
}

type menuListRequest struct {
	Menu []Menu `json:"menu"`
}

type menuResponse struct {
	Menu string `json:"menu"`
}

func main() {
	port := "8080"
	http.HandleFunc("/recommend/lunch", recommendLunch)

	log.Printf("Server starting on port %v/n", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", port), nil))
}

func recommendLunch(w http.ResponseWriter, r *http.Request) {
	var menus menuListRequest
	err := json.NewDecoder(r.Body).Decode(&menus)

	if err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}

	if len(menus.Menu) == 0 {
		http.Error(w, "Least one menu needed", http.StatusBadRequest)
		return
	}

	isEaten := 0
	for _, menu := range menus.Menu {
		if menu.Eaten {
			isEaten++
		}

		if isEaten > 1 {
			http.Error(w, "More than one eaten menu", http.StatusBadRequest)
			return
		}

	}

	var response menuResponse
	json.NewEncoder(w).Encode(response)

}
