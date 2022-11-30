const { Module } = require('module');
const { Command } = require('../../Core/Classes/Command.js'); 
const { resolveUser } = require('../../Core/Utils/Resolvers.js'); 

class Avatar extends Command { 
    constructor() { 
        super({
            name: 'avatar', 
            module: 'Info', 
            aliases: ['av'], 
            userPerms: 'User', 
            helpDetail: 'Sends a user\'s avatar or your own.' , 
            helpUsage: 'avatar\navatar [user]', 
            helpExample: 'avatar @boss'
        })
    }

    async execute (client, msg, args) { 
        const guild = msg.member.guild; 
        let member = resolveUser(guild, msg, args.join('')); 
        if (!member) { 
            member = msg.member
        }
        let r = member.roles.sort((a, b) => b.position - a.position)[0]
        let roleColor = msg.channel.guild.roles.get(r).color
        client.createMessage(msg.channel.id, { 
            embed: {
                author: { 
                    name: `${member.user.username}#${member.user.discriminator}`, 
                    icon_url: member.user.avatarURL
                }, 
                color: roleColor, 
                image: { 
                    url: member.avatarURL
                }
                
            }
        })
    }
}

module.exports.cmd = Avatar