const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const User = require('../models/User');
const LoginLog = require('../models/LoginLog');

router.get('/', (req, res) => res.render('welcome'));  //Index Pagerouter
//Dashboard router
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    User.countDocuments({active: true})
        .then(activeUsers => {
            console.log(activeUsers);
            User.find({active: true})
                .then( resultUsers => {
                    console.log(resultUsers);
                    LoginLog.findOne({ email: req.user.email })
                        .then( log => {
                            if(log) {
                                log.Log = Date(Date.now());
                                log.save();
                            } else {
                                const newLog = new LoginLog({
                                    email: req.user.email,
                                    Log: Date(Date.now())
                                });                                
                                newLog.save();
                            }
                            LoginLog.find()
                                .then(log => {
                                    console.log(log);
                                    res.render('dashboard', {
                                        email: req.user.email,
                                        name: req.user.name,
                                        activeUsers: activeUsers,
                                        resultUsers: resultUsers,
                                        Log: log
                                    })
                                });
                        })
                        
                })
    });
});    

module.exports = router;