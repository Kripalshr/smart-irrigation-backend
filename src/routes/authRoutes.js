// Define authentication-related routes
const express = require('express');
const { signup, login } = require('../controllers/authController');
const { json } = require('body-parser');


const router = express.Router();

router.post('/signup',json(), signup);
router.post('/login',json(), login);

module.exports = router;
