const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const User = require('../models/User');

router.get('/', (req, res) => res.render('welcome'));  //Index Pagerouter
//Dashboard router
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    User.countDocuments({active: true})
        .then(activeUsers => {
            console.log(activeUsers);
            res.render('dashboard', {
                email: req.user.email,
                name: req.user.name,
                activeUsers: activeUsers
        })
    });
});    

module.exports = router;