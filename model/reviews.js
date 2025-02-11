const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewsSchema = new Schema({
    userName: {
        type: String,
    },
    comment: String,
    createdTime: {
        type: Date,
        default: Date.now
    }
})

const Reviews = mongoose.model('Reviews', reviewsSchema)
module.exports = Reviews