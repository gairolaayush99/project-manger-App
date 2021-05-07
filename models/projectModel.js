

const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({

    title: {
        type: String,
        required:true
    },
    content: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        default:Date.now
    },
    user_id: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required:true
    }
}, {
    timestamps: true,
    default:Date.now
})
module.exports = mongoose.model('Project',projectSchema)