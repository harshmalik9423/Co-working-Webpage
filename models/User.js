const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: "https://www.iconspng.com/images/-abstract-user-icon-1/-abstract-user-icon-1.jpg"
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User',UserSchema);

module.exports = User;