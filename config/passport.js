const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User  = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            //Find user
            User.findOne({ email: email})
            .then(user => {
                if(!user) {
                   return done(null,false, { message: 'This User is not registered'});
                }

                //Check password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;

                    if(isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message :'Invalid Password'});
                    }
                });
            });
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};