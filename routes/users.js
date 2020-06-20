const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => res.send('Login'));              //Login
router.get('/register', (req, res) => res.send('Register'));        //Reigister

module.exports = router;