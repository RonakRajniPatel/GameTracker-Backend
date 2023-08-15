console.log("node + express server up");

const express = require('express')
const app = express();
const cors = require('cors');
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
var myGame = new Game("Minecraft2", "Have played", "43");
gameList.push(JSON.stringify(myGame));
var myGame = new Game("Minecraft3", "Want to play", "34");
gameList.push(JSON.stringify(myGame));

// express testing
app.get('/', (req, res) => {
  res.send('Express Response')
});

app.get('/games', (req, res) => {
  res.json(gameList);
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
