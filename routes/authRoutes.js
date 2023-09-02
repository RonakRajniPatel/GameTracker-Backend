const express = require('express');
const client = require('../db/dbConfig');
const router = express.Router();
require('dotenv').config();
router.use(express.json());

client.connect();
