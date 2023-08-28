console.log("node + express server up");

const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client } = require ('pg');
const axios = require('axios')
require('dotenv').config();

const clientId = process.env.IGDB_CLIENT_ID;
const clientSecret = process.env.IGDB_CLIENT_SECRET;
const app = express();
var router = express.Router();
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

let accessToken;
gameList = []

const query = `
  fields name;
  search "Assassin's Creed";
`;

async function fetchToken() {
    // gets access key from IGDB
    return axios.post('https://id.twitch.tv/oauth2/token', null, {
        params: {
            'client_id': clientId,
            'client_secret': clientSecret,
            'grant_type': 'client_credentials',
        },
    })
    .then(async (response) => {
        accessToken = response.data.access_token;
    })
    .catch((error) => {
        console.error('Error', error);
    });
}

async function fetchGames() {
    if (!accessToken) {
        await fetchToken();
    }

    axios.post('https://api.igdb.com/v4/games/', query, {
        headers: {
            'Accept': 'application/json',
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'text/plain',
        },
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(err => {
        console.error(err);
    });
}
fetchGames();


// sends games JSON file
router.get('/games', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM games');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while retrieving games');
    }
});

// gets games JSON file
router.post('/save/game', async (req, res) => {
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

module.exports = router;

// handles the shutdown of the server
process.on('SIGINT', () => {
  console.log("Shutting down gracefully");
  server.close(() => {
    console.log('server has been closed');
    process.exit(0);
  });
});
