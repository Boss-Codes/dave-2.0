const { mongoose } = require('mongoose'); 

const Warning = new mongoose.Schema({
    _id: Shcmea.Types.ObjectId,
    id: String,
    userId: String,
    username: String,
    moderatorID: String,
    moderatorUsername: String,
    reason: String,
    time: String
})

module.exports = mongoose.model('Warning', Warning)