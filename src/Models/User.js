const { Schema, model } = require('mongoose'); 

const userSchema = new Schema({
    id: String,
    user: String,
    isBlacklisted: { 
        type: Boolean, 
        default: false
    },
})