//DOESNT HAVE ANY ROUTES YET

const express = require('express');
require('dotenv').config();
var router = express.Router();
const axios = require('axios')



const clientId = process.env.IGDB_CLIENT_ID;
const clientSecret = process.env.IGDB_CLIENT_SECRET;

let accessToken;

// gets access key from IGDB
async function fetchToken() {
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

const query = `
  fields name;
  search "Assassin's Creed";
`;

// sends query to IGDB
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

module.exports = {
    fetchGames,
    fetchToken
}