const { mongoose } = require('mongoose'); 

const Moderation = new mongoose.Schema({
    _id: Shcmea.Types.ObjectId,
    type: String,
    userId: String,
    username: String,
    moderatorID: String,
    moderatorUsername: String,
    duration: String,
    reason: String,
    time: String
})

module.exports = mongoose.model('Moderation', Moderation)