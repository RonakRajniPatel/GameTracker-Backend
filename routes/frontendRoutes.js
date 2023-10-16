const express = require('express');
const client = require('../db/dbConfig');
var router = express.Router()
router.use(express.json());

client.connect();

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

// This is a route that will test various things by hooking it up to a button on frontend
router.get('/test', (req, res) => {
  try {
    res.json("test");
  }
  catch (err) {
    console.error(err);
  }
})

module.exports = router;