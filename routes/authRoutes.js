const express = require('express');
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();
router.use(express.json());

// uses this config when i set up my auth on my router
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'random string in env',
    baseURL: 'http://localhost:8080',
    clientID: '0j00Y5G0K46pLJlnOYsZuTMzUb2RSBzu',
    issuerBaseURL: 'https://dev-ve7sclrcwpbgt8oq.us.auth0.com'
};

//addes auth stuff to my router with my config
router.use(auth(config));

// sets up the sign in page
router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

//get user profile info
router.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

module.exports = router;
