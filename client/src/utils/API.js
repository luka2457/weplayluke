import axios from "axios";

export default {
  // Gets all games
  getGames: function () {
    return axios.get("/api/games");
  },
  // Gets the book with the given id
  getGame: function (id) {
    return axios.get("/api/games/" + id);
  },
  // Deletes the book with the given id
  deleteGame: function (id) {
    return axios.delete("/api/games/" + id);
  },
  // Saves a book to the database
  saveGame: function (gameData) {
    return axios.post("/api/games", gameData);
  },
  // Saves a player to the game
  updateGame: function (id, userData) {
    return axios.put("/api/games/" + id, userData);
  },
  // Saves a book to the database
  saveUser: function (userData) {
    return axios.post("/api/users", userData);
  },
  // Gets the book with the given id
  getUser: function (id) {
    return axios.get("/api/users/" + id);
  },
  // sends mail
  sendMail: function (emailToWho) {
    return axios.post("/api/sendMail", emailToWho)
  }
};
