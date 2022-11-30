const { Schema, model } = require('mongoose'); 

const guildSchema = new Schema({
    _id: Schema.Types.ObjectId,
    guildId: String,
    guildName: String,
    ownerId: String,
    owner: {
        type: String,
        default: 'Could not fetch.',
    },
    prefix: {
        type: String,
        default: '!'
    }, 
    messageLogChannel: {
        type: String,
        default: ''
    }, 
    modLogChannel: { 
        type: String,
        default: ''
    }, 
    serverLogChannel: {
        type: String,
        default: ''
    }, 
    otherLogChannel: {
        type: String,
        default: ''
    }, 
    welcomeChannel: {
        type: String,
        default: ''
    }, 
    botCommander: {
        type: Array, 
        default: []
    }, 
    modRoles: {
        type: Array, 
        default: []
    }, 
    tags: [{
        name: String,
        content: String,
        createdBy: String,
        timestamp: String
    }]
})
module.exports = model('Guild', guildSchema, 'guilds')