const { Command } = require('../../Core/Classes/Command.js'); 
const { defaultColor, online, idle, dnd, offline } = require('../../Core/Utils/Global.js'); 
const config = require('../../../config.json'); 
class MemberCount extends Command {
    constructor(){
        super({
            name: 'membercount', 
            module: 'Info', 
            aliases: ['members'],
            userPerms: 'User', 
            helpDetail: 'Shows the amount of members in the server.\nUse the `full` option to show the status breakdown of all members.', 
            helpUsage: `membercount\nmembercount full`
        })
    }

    async execute(client, msg, args) { 
        // defining the members 
        let totalMemberCount = msg.channel.guild.members.size; 
        let bots = msg.channel.guild.members.filter(m => m.bot).length; 
        let humans = msg.channel.guild.members.filter(m => !m.bot).length; 
        let onlineM = msg.channel.guild.members.filter(m => m.status === 'online').length
        let idleM = msg.channel.guild.members.filter(m => m.status === 'idle').length
        let dndM = msg.channel.guild.members.filter(m => m.status === 'dnd').length


        const data = {
            embed: {
                author: {  name: `${msg.channel.guild.name}`, icon_url: `${msg.channel.guild.iconURL}` }, 
                footer: { text: `Server ID: ${msg.channel.guild.id}` }, 
                timestamp: new Date,
                color: defaultColor,
                fields: [
                { name: 'Members', value: totalMemberCount, inline: true }, 
                { name: 'Users', value: humans, inline: true }, 
                { name: 'Bots', value: bots, inline: true }
            ]
            }       
        }
        if (!args[0]) { 
            return client.createMessage(msg.channel.id, data)
        }


        // subcommand 
        if (args.join(' ') === 'full') { 
            client.createMessage(msg.channel.id, {
                embed: {
                    author: { name: `${msg.channel.guild.name}`, icon_url: `${msg.channel.guild.iconURL}` }, 
                    footer: { text: `Server ID: ${msg.channel.guild.id}` }, 
                    timestamp: new Date,
                    color: defaultColor,
                    fields: [
                    { name: `Online ${online}`, value: onlineM, inline: true },
                    { name: `Idle ${idle}`, value: idleM, inline: true }, 
                    { name: `DnD ${dnd}`, value: dndM, inline: true}, 
                    { name: 'Users', value: totalMemberCount, inline: true }, 
                    { name: 'Humans', value: humans, inline: true }, 
                    { name: 'Bots', value: bots, inline: true },
                    { name: 'Max Members', value: `${msg.channel.guild.maxMembers}`, inline: true }, 
                    { name: 'Max Presences', value: `N/A`, inline: true }
                ]
            }
            })
        }
    }
}
module.exports.cmd = MemberCount;