const express = require('express');
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();
router.use(express.json());

const clientId = process.env.AUTH0_CLIENT_ID;
const clientSecret = process.env.AUTH0_SECRET;
const issuerBaseURL = process.env.AUTH0_ISSUER_BASE_URL;


// uses this config when i set up my auth on my router
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: clientSecret,
    baseURL: 'http://localhost:8080',
    clientID: clientId,
    issuerBaseURL: issuerBaseURL
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
