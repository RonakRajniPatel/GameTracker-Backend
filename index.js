// importing modules
const express = require('express');
const cors = require('cors');
const app = express();
var router = express.Router();``
var PORT = 8080;

// importing routes
const {fetchGames, fetchToken} = require('./routes/igdbRoutes');
const frontendRoutes = require('./routes/frontendRoutes');
const Game = require('./classes/game');

// HTTP checks
app.use(express.json());
app.use(cors());
app.use('/', frontendRoutes);

gameList = [];

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
