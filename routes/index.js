const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('welcome'));  //Index Pagerouter
router.get('/dashboard', (req, res) => res.render('dashboard'));    //Dashboard router

module.exports = router;