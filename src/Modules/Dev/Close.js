const { Command } = require('../../Core/Classes/Command.js'); 
const config = require('../../../config.json'); 
const { red } = require('../../Core/Utils/Global.js'); 

class Close extends Command { 
    constructor(){
        super({
            name: 'close', 
            module: 'Dev', 
            userPerms: 'Dev', 

            helpDetail: 'Closes the modmail thread.', 
            helpUsage: 'close [reason]', 
            helpExample: 'close Dealt with.'
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

        const user = msg.channel.guild.members.get(msg.channel.topic)
        let reason = args.join(' ') || 'None'
        client.getDMChannel(msg.channel.topic).then(c => { 
            c.createMessage(`This thread has now been marked as complete and has been closed. Please don't send a reply unless you wish to open a new thread and talk to a Staff member.`)
            client.createMessage('1052399093802082304', { 
                embed: { 
                    color: red, 
                    timestamp: new Date, 
                    author: { name: `${msg.member.username}#${msg.member.discriminator}`, icon_url: msg.member.avatarURL}, 
                    description: `**User:** ${user.username}#${user.discriminator} (${user.id})\n**Action:** Thread closed\n**Reason:** ${reason}`
                }
            })
            client.deleteChannel(msg.channel.id, `Thread closed by: ${msg.member.username}#${msg.member.discriminator}`)
        })

    }
}

module.exports.cmd = Close;