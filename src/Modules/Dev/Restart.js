const { Command } = require('../../Core/Classes/Command.js'); 
const config = require('../../../config.json')
const { prefix, error, success } = require('../../Core/Utils/Global.js')
class Restart extends Command { 
    constructor(){
        super({
            name: 'restart', 
            module: "Dev", 
            aliases: ['r', 'boot'], 

            helpDetail: 'Restarts the bot', 
            helpUsage: `${config.prefix}restart`, 
        });
    }
    
    async execute(client, msg, args) {
        if (!config.developer.includes(msg.author.id)) return;
        
        client.createMessage(msg.channel.id, `${success} Successfully restarting client`).then(message => {
            client.disconnect()
            client.connect()
            client.editMessage(message.channel.id, message.id, `${success} Successfully restarted client!`)
        })

    }
};
module.exports.cmd = Restart;