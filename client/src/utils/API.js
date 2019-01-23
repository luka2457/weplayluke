import axios from "axios";

export default {
  // Gets all games
  getGames: function () {
    console.log("getGames in the API client side")
    return axios.get("/api/games");
  },
  // Gets the book with the given id
  getGame: function (id) {
    console.log("getGames in the API client side")
    return axios.get("/api/games/" + id);
  },
  // Deletes the book with the given id
  deleteGame: function (id) {
    console.log("deleteGame firing in the API client side")
    return axios.delete("/api/games/" + id);
  },
  // Saves a book to the database
  saveGame: function (bookData) {
    console.log("saveGame firing in the API client side")
    console.log(bookData)
    return axios.post("/api/games", bookData);
  },
  // Saves a player to the game
  updateGame: function (id, userData) {
    console.log("addPlayer firing in the API client side");
    console.log(userData);
    return axios.put("/api/games/" + id, userData);
  },
  // Saves a book to the database
  saveUser: function (userData) {
    console.log("saveUser firing in the API client side")
    console.log(userData)
    return axios.post("/api/users", userData);
  },
  // Gets the book with the given id
  getUser: function (id) {
    console.log("getUser in the API client side")
    return axios.get("/api/users/" + id);
  },
  // sends mail
  sendMail: function (emailToWho) {
    console.log("sendMail hit in API.js client side")
    console.log(emailToWho)
    return axios.post("/api/sendMail", emailToWho)
  }
};
