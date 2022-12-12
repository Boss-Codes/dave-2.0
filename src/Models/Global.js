const { kStringMaxLength } = require('buffer');
const { Schema, model } = require('mongoose'); 

const globalSchema = new Schema({
    blacklistedUsers: [{
        username: String,
        userId: String,
        reason: String,
        timeStamp: String
    }], 
    blacklistedServers: [{
        guild: String,
        guildId: String,
        owner: String,
        ownerId: String,
        reason: String,
        timeStamp: String
    }]
})
module.exports = model('Global', globalSchema, 'globalDB')