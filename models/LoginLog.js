const mongoose = require('mongoose');

const LoginDataSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    Log: {
        type: Date
    }
});

const LoginLog = mongoose.model('LoginLog',LoginDataSchema);

module.exports = LoginLog;