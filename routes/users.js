const express = require('express');
const router = express.Router();

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
        res.send('pass');
    }
});

module.exports = router;