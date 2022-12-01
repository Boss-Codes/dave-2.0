const { Command } = require('../../Core/Classes/Command.js'); 
const { defaultColor, error, red } = require('../../Core/Utils/Global.js'); 
const { formatDate } = require('../../Core/Utils/Functions.js'); 
const { RoleCredentialsFilterSensitiveLog } = require('@aws-sdk/client-sso');

class RoleInfo extends Command { 
    constructor() { 
        super({
            name: 'role-info', 
            module: 'Info', 
            userPerms: 'User', 
            aliases: ['role', 'roleinfo'], 
            helpDetail: 'Gives information about the specified role.', 
            helpUsage: 'role-info <role-name | id>', 
            helpExample: 'roleinfo Admin\nroleinfo 1045608249870790706'
        })
    }

    async execute(client, msg, args) { 
        if (!args[0]) return client.createMessage(msg.channel.id, { embed: { color: red, description: `${error} Provide a role!` } }); 

        let role = msg.channel.guild.roles.get(args[0]); 
        if (!role && msg.roleMentions && msg.roleMentions[0]) { 
            role = msg.channel.guild.roles.get(msg.roleMentions[0])
        }
        if (!role) role = msg.channel.guild.roles.find(r => r.name.toLowerCase().startsWith(args.join(' ').toLowerCase())); 
        if (!role || role.id === msg.channel.guild.id) return client.createMessage(msg.channel.id, { embed: { color: red, description: `${error} Invalid role!`} })
        const fRole = role;

        /* A ton of variables to format */
        const count = msg.channel.guild.members.filter(m => m.roles.includes(fRole.id)).length;
        let title = `${role.name}`; 
        const createdAt = formatDate(role.createdAt)

        /* Function to format permissions better */
        function checkRolePermission(guild, role) { 
            const arrayOfPerms = []; 

            if (role.permissions.has('administrator')) {
                arrayOfPerms.push('Administrator')
            }
            if (role.permissions.has('manageGuild')) {
                arrayOfPerms.push('Manage Server')
            }
            if (role.permissions.has('manageRoles')) {
                arrayOfPerms.push('Manage Roles')
            }
            if (role.permissions.has('manageChannels')) {
                arrayOfPerms.push('Manage Channels')
            }
            if (role.permissions.has('viewAuditLogs')) {
                arrayOfPerms.push('View Audit Logs')
            }
            if (role.permissions.has('kickMembers')) {
                arrayOfPerms.push('Kick Members')
            }
            if (role.permissions.has('banMembers')) {
                arrayOfPerms.push('Ban Members')
            }
            if (role.permissions.has('manageNicknames')) {
                arrayOfPerms.push('Manage Nicknames')
            }
            if (role.permissions.has('manageEmojis')) {
                arrayOfPerms.push('Manage Emojis')
            }
            if (role.permissions.has('manageWebhooks')) {
                arrayOfPerms.push('Manage Webhooks')
            }
            if (role.permissions.has('manageMessages')) {
                arrayOfPerms.push('Manage Messages')
            }
            if (role.permissions.has('mentionEveryone')) {
                arrayOfPerms.push('Mention Everyone')
            }
            return arrayOfPerms;
        }

        const data = { 
            embed: { 
                color: role.color, 
                description: role.mention, 
                footer: { text: `Created • ${createdAt} | Role ID: ${role.id}`}, 
                timestamp: new Date, 
                fields: [
                    { name: 'ID', value: `${role.id}`, inline: true },
                    { name: 'Name', value: `${title}`, inline: true },
                    { name: 'Color', value: `#${parseInt(role.color, 16)}`, inline: true }, 
                    { name: 'Mention', value: role.mention, inline: true }, 
                    { name: 'Members', value: count, inline: true }, 
                    { name: 'Position', value: role.position, inline: true }
                ]
            }
        }

        /* If statements */
        if (!role.hoist) { 
            data.embed.fields.push({ name: 'Hoisted', value: 'No', inline: true })
        } else { 
            data.embed.fields.push({ name: 'Hoisted', value: 'Yes', inline: true })
        }
        
        if (role.managed) data.embed.title = `Integrated Bot Role`; 

        if (!role.mentionable) { 
            data.embed.fields.push({ name: 'Mentionable', value: 'No', inline: true })
        } else { 
            data.embed.fields.push({ name: 'Mentionable', value: 'Yes', inline: true })
        }

        if (checkRolePermission(msg.channel.guild, role).length > 0) { 
            data.embed.fields.push({ name: 'Key Permissions', value: `${checkRolePermission(msg.channel.guild, role).join(', ')}` })
        }

        client.createMessage(msg.channel.id, data)

    }
}

module.exports.cmd = RoleInfo;