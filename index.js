console.log("node + express server up");

const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client } = require ('pg');

const app = express();
app.use(bodyParser.json());
var PORT = 8080;

app.use(cors());

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'oddrabbit6',
  database: 'postgres'
});

client.connect();

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

gameList = []
var myGame = new Game("Pokemon", "Have played", "93");
gameList.push(myGame);
console.log("initial game list");
console.log(gameList);


// sends games JSON file
app.get('/games', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM games');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while retrieving games');
    }
});

// gets games JSON file
app.post('/save/game', async (req, res) => {
    const game = req.body;
    try {
      await client.query('INSERT INTO games (title, status, hours) VALUES ($1, $2, $3)', [game.title, game.status, game.hours]);
      res.send('Game saved');
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
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
