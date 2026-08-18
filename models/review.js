const mongoose = require('mongoose')
const { Schema } = mongoose

const reviewSchema = new Schema({
    comment: {
        type: String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author : {
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

module.exports = mongoose.model("Review", reviewSchema)