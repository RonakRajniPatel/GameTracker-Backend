// importing modules
const express = require('express');
const cors = require('cors');
const app = express();
var router = express.Router();

// importing routes
const {fetchGames, fetchToken} = require('./routes/igdbRoutes');
const frontendRoutes = require('./routes/frontendRoutes');

// HTTP checks
app.use(express.json());
app.use(cors());
app.use('/', frontendRoutes);

var PORT = 8080;

// sample json data to test with
class Game {
  constructor(title, status, hours) {
      this.title = title;
      this.status = status;
      this.hours = hours;
  }
  static fromJSON(json) {
      return new Game(json.title, json.status, json.hours);
  }

  static toString() {
      return `Title: ${this.title}, Status: ${this.status}, Hours: ${this.hours}`;
  }
}
gameList = [];

// listener
const server = app.listen(8080, () => {
  console.log("server is listening on port 8080");
});

// handles the shutdown of the server
process.on('SIGINT', () => {
  console.log("Shutting down gracefully");
  server.close(() => {
    console.log('server has been closed');
    process.exit(0);
  });
});

module.exports = router;
