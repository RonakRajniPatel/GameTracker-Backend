// importing modules
const express = require('express');
const cors = require('cors');
const app = express();
var router = express.Router();
var PORT = 8080;
const session = require('express-session');

// importing routes
const {fetchGames, fetchToken} = require('./routes/igdbRoutes');
const frontendRoutes = require('./routes/frontendRoutes');
const authRoutes = require('./routes/authRoutes');
const Game = require('./classes/game');

// HTTP checks
app.use(express.json());
app.use(cors());
app.use('/', frontendRoutes);

gameList = [];

// creates a session
app.use(session({
    secret: 'generated_key', // change later, created issue
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// testing the session
app.get('/', (req, res) => {
    if (req.session.views) {
        req.session.views++;
        res.send(`<h1>Visits: ${req.session.views}`);
    } else {
        req.session.views = 1;
        res.send('Welcome to this website. You are visiting for the first time!');
    }
});

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
