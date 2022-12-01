const { Command } = require('../../Core/Classes/Command.js'); 
const { defaultColor, modules, version } = require('../../Core/Utils/Global.js'); 

class BotInfo extends Command { 
    constructor() { 
        super({
            name: 'bot-info', 
            module: 'Info', 
            aliases: ['botinfo', 'stats', 'bot-information'], 
            userPerms: 'User',
            helpDetail: 'Gives statistics and information on the bot.', 
            helpUsage: 'bot-info'
        })
    }

    async execute (client, msg) { 
        let up = client.uptime;
        let sseconds = (Math.round(up / 1000)); 
        let days = Math.floor(Math.round(sseconds) / 86400); 
        let hours = Math.floor(Math.round(sseconds) / 3600); 
        sseconds %= 3600;
        let minutes = Math.floor(Math.round(sseconds) / 60); 
        let seconds = sseconds % 60
        let build = 'Prod'
        if (client.user.id == '564570881037303819') build = 'Dev'

        client.createMessage(msg.channel.id, {
            embed: {
                author: { 
                    name: client.user.username, 
                    icon_url: client.user.avatarURL
                }, 
                footer: {
                    text: `${client.user.username} | ${build} | PPID: ${process.ppid} | Shard ${msg.channel.guild.shard.id} | Uptime: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
                },
                color: defaultColor, 
                fields: [
                { name: 'Version', value: version, inline: true }, 
                { name: 'Library', value: 'Eris', inline: true }, 
                { name: 'Creator', value: 'boss#0001', inline: true}, 
                { name: 'Servers', value: client.guilds.size, inline: true }, 
                { name: 'Users', value: client.users.size, inline: true }, 
                { name: 'Modules', value: client.modules, inline: true },
                { name: 'Bot Invite', value: `[Click Here](https://discord.com/api/oauth2/authorize?client_id=564472435336806450&permissions=8&scope=bot)`, inline: true }, 
                { name: 'Support Server Invite', value: '[Click Here](https://discord.gg/mePghx6dQy)', inline: true }, 
                { name: 'Github Repo', value: '[Repo-Link](https://github.com/Boss-Codes/metis) ', inline: true }
            ]

            }
        })
    }
}

module.exports.cmd = BotInfo 