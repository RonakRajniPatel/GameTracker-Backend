const express = require('express');
const passport = require('passport');
const client = require('../db/dbConfig');
const GoogleStrategy = require('passport-google-oauth20');
const router = express.Router();
require('dotenv').config();
router.use(express.json());

client.connect();

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

// Initialize passport middleware
router.use(passport.initialize);
router.use(passport.session);

passport.use(new GoogleStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: 'http://www.localhost:8080/oauth2/redirect/google'
},
function(acce)
));