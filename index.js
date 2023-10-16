// importing modules
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
var router = express.Router();
var PORT = 8080;

// importing routes
const {fetchGames, fetchToken} = require('./routes/igdbRoutes');
const frontendRoutes = require('./routes/frontendRoutes');
// const authRoutes = require('./routes/authRoutes');
const Game = require('./classes/game');

// middleware
app.use(express.json());
app.use(cors());

// app.use('/', authRoutes);

app.use('/', frontendRoutes);

gameList = [];

// Testing Area
console.log("Hi");

// listener
const server = app.listen(PORT, () => {
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
