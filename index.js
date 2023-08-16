console.log("node + express server up");

const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
var PORT = 8080;

app.use(cors());

// sample json data to test with
class Game {
  constructor(title, status, hours) {
      this.title = title;
      this.status = status;
      this.hours = hours;
  }
}
gameList = []
var myGame = new Game("Pokemon", "Have played", "93");
gameList.push(JSON.stringify(myGame));
console.log("initial game list");
console.log(gameList);



// express testing
app.get('/', (req, res) => {
  res.send('Express Response')
});

// sends games JSON file
app.get('/games', (req, res) => {
  console.log("getGames()");
  res.json(JSON.parse(gameList));
});

// gets games JSON file
app.post('/save/game', (req, res) => {
  console.log("saveGame()");
  const myGame = req.body;
  gameList.push(JSON.parse(myGame));
});

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
