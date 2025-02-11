const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reservationSchema = new Schema({
    reservedBy: String,
    lastName: String,
    date: String,
    time: String,
    createdTime: {
        type: Date,
        default: Date.now,
    },
    code:Number,
    services: String,
});


const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation