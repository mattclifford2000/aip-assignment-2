const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: String,
    admin: Boolean
});

module.exports = mongoose.model('User', UserSchema);