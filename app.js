const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

//Passport config
require('./config/passport')(passport);

// Mongo Schema set
const db = require('./config/keys').MongoURI;

// Connecting to MongoDB
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connection established'))
    .catch(err => console.log(err));

//Set view for ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({ extended: true }));

// Expess-Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//PassportMiddleware
app.use(passport.initialize());
app.use(passport.session());

//Connecting Flash
app.use(flash());

//Global vars of flash for success and error
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('succss_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//ROUTES
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
