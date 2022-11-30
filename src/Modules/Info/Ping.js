const { Command } = require('../../Core/Classes/Command.js'); 

class Ping extends Command { 
    constructor(){
        super({
            name: 'ping', 
            module: 'Info', 
            aliases: ['pong'], 
            userPerms: 'User', 
            helpDetail: 'Pings the bot.', 
            helpUsage: 'ping'
        });
    }

    async execute(client, msg) { 
        let time = Date.now()
        let m = await client.createMessage(msg.channel.id, 'Pong!'); 
        let now = Date.now()
        m.edit(`Pong! \`${now - time}ms\``)
    }
}

module.exports.cmd = Ping;