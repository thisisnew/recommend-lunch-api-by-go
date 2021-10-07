package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/pat"
	"github.com/urfave/negroni"
	"log"
	"math/rand"
	"net/http"
)

type Menu struct {
	Name  string `json:"name"`
	Place string `json:"place"`
}

type menuListRequest struct {
	Menu []Menu `json:"menu"`
}

type menuResponse struct {
	Menu  string `json:"menu"`
	Place string `json:"place"`
}

func main() {
	port := "8080"
	mux := pat.New()
	mux.Post("/recommend/lunch", recommendLunch)
	n := negroni.Classic()
	n.Use(negroni.NewStatic(http.Dir("public")))
	n.UseHandler(mux)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", port), n))
}

func recommendLunch(w http.ResponseWriter, r *http.Request) {
	var menus menuListRequest
	err := json.NewDecoder(r.Body).Decode(&menus)

	if err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}

	if len(menus.Menu) == 0 {
		http.Error(w, "At least one menu needed", http.StatusBadRequest)
		return
	}

	menuMap := make(map[string]bool)
	for _, menu := range menus.Menu {
		if menuMap[menu.Place] {
			http.Error(w, "There are more than one same place", http.StatusBadRequest)
			return
		} else {
			menuMap[menu.Name] = true
		}
	}

	menuCount := len(menus.Menu)
	idx := rand.Intn(menuCount)

	res := menuResponse{
		Menu:  menus.Menu[idx].Name,
		Place: menus.Menu[idx].Place,
	}

	json.NewEncoder(w).Encode(res)
}

const EatenLimit = 1
