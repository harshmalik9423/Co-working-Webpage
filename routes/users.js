const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/User');

router.get('/login', (req, res) => res.render('login'));              //Login
router.get('/register', (req, res) => res.render('register'));        //Reigister

// Register POST 
router.post('/register', (req,res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if(!name || !email || !password || !password2) {
        errors.push({ msg: "Incomplete Feilds!"});
    }

    if(password != password2) {
        errors.push({ msg: 'Passwords does not match'});
    }

    if(password.length < 6) {
        errors.push({ msg: 'Password length smaller than 6!'});
    }

    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        // Form Data Passed
        User.findOne({ email: email })
            .then(user => {
                if(user) {
                        //email already exists
                        errors.push({ msg: 'Email already exists!'})
                        res.render('register', {
                            errors,
                            name,
                            email,
                            password,
                            password2
                        });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    
                    //Encrypting Password
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err)  throw err;

                        newUser.password = hash;
                        //Saving User
                        newUser.save()
                        .then(user => {
                            res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));
                    }))
                }
            });
        }
});

module.exports = router;