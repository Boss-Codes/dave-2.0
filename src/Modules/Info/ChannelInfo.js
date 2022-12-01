const { Command } = require('../../Core/Classes/Command.js'); 
const global = require('../../Core/Utils/Global.js'); 
const { sortRoles, formatDate } = require('../../Core/Utils/Functions.js'); 
class ChannelInfo extends Command { 
    constructor() { 
        super({
            name: 'channel-info', 
            module: 'Info', 
            userPerms: 'User', 
            aliases: ['channel'], 
            helpDetail: 'Shows various information on the given channel.', 
            helpUsage: 'channel-info <channel>', 
            helpExample: 'channel-info general'

        });
    };

    async execute(client, msg, args) {  
        let channel = msg.member.guild.channels.get(args[0]) || msg.member.guild.channels.find(c => c.name === args[0]);
        if (!channel && msg.channelMentions && msg.channelMentions[0]) { 
            channel = msg.channel.guild.channels.get(msg.channelMentions[0])
        }
        if (!channel) channel = msg.member.guild.channels.get(msg.channel.id)
        let perms = channel.permissionOverwrites.filter(c => c.id != msg.member.guild.id).map(c => c.id)
        let r1 = []
        perms.forEach(r => r1.push(msg.channel.guild.roles.get(r)));
        const sortedRoles = r1.sort((a, b) => b.position - a.position);
        const roleList = sortedRoles.map(r => r.mention).join(', ')
        
        if (channel.type === 0) { 
            client.createMessage(msg.channel.id, {
                embed: {
                    color: global.blue, 
                    author: {  name: 'Channel Information' }, 
                    fields: [ 
                        { name: 'ID', value: channel.id, inline: true }, 
                        { name: 'Name', value: channel.name, inline: true }, 
                        { name: 'Mention', value: `\`${channel.mention}\``, inline: true }, 
                        { name: 'Category', value: `${msg.member.guild.channels.get(channel.parentID).name}`, inline: true }, 
                        { name: 'NSFW', value: channel.nsfw ? 'Yes' : 'No', inline: true}, 
                        { name: 'Channel Topic', value: channel.topic || 'None'}, 
                        { name: `Roles (${perms.length})`, value: roleList}
                    ],
                    footer: { text: `Created ${formatDate(channel.createdAt)}` }
                }
            })
        }
    }
}
module.exports.cmd = ChannelInfo

