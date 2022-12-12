const { Schema, model } = require('mongoose'); 

const userSchema = new Schema({
    id: String,
    username: String,
    isBlacklisted: Boolean, 
    ownedGuilds: [{
        guildId: String,
        guildName: String
    }]
})