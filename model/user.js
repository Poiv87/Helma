const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdTime: {
        type: Date,
        default: new Date(),
    },
    reserved: {
        type: Number,
        default: 0,
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;