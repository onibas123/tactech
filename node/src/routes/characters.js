const express = require('express');
const request = require('request');
const router = express.Router();
const { getById, getAll, create }= require("../controllers/charactersController");


// GET all 'characters'
router.get('/characters/',getAll);
// GET A 'Character'
router.get('/characters/:id', getById);



module.exports = router;