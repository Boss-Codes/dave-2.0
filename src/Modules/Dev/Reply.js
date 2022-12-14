const { Command } = require('../../Core/Classes/Command.js'); 
const config = require('../../../config.json'); 
const { error, red } = require('../../Core/Utils/Global.js'); 

class Reply extends Command { 
    constructor(){
        super({
            name: 'reply', 
            module: 'Dev', 
            userPerms: 'Dev', 
            aliases: ['msg', 'message', 'dm'], 

            helpDetail: 'Replies to a modmail thread.', 
            helpUsage: 'reply <user ID> <message>', 
            helpExample: 'reply 344954369285947392 You suck!'
        })
    }

    async execute(client, msg, args) { 
        if (!config.developer.includes(msg.author.id)) { return }
        if (!msg.member.roles.includes('1043755665933475840')) { return }
        if (!msg.member.roles.includes('1045607827370160179')) { return }
        if (!msg.member.roles.includes('1045607714572750848')) { return }
        if (!msg.member.roles.includes('1045607763260211251')) { return }
        if (!msg.member.roles.includes('1045607755693707324')) { return }
        
        if (!msg.channel.parentID === '1052372328018870374') { return } 

        if (!args[0]) return client.createMessage(msg.channel.id, { embed: { color: red, description: `${error} Provide a user to reply to!`}})

        // highest reply 
        let highestReply = ``
        if (msg.member.roles.includes('1045607755693707324')) { highestReply = `**Support**`}
        if (msg.member.roles.includes('1045607763260211251')) { highestReply = `**Moderator**`}
        if (msg.member.roles.includes('1045607714572750848')) { highestReply = `**Lead Staff**`}
        if (msg.member.roles.includes('1045607827370160179')) { highestReply = `**Senior Staff**`}
        if (msg.member.roles.includes('1043755665933475840')) { highestReply = `**Developer**`}




        client.getDMChannel(msg.channel.topic).then(c => { 
            c.createMessage(`${highestReply}: ${args.join(' ')}`)
            msg.delete()
            client.createMessage(msg.channel.id, `${highestReply} (**${msg.author.username}#${msg.author.discriminator}):** ${args.join(' ')}`)
        })

    }
}

module.exports.cmd = Reply;