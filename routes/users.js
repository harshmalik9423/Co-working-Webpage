const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => res.render('login'));              //Login
router.get('/register', (req, res) => res.render('register'));        //Reigister

module.exports = router;