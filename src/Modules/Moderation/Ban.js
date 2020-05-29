const { Command } = require('../../Core/Classes/Command.js'); 
const { red, userError, noUser, error } = require('../../Core/Utils/Global.js'); 
const { resolveUser } = require('../../Core/Utils/Resolvers.js'); 
const config = require('../../../config.json'); 
const { stripIndents } = require('common-tags'); 

class Ban extends Command {
     constructor(){
         super({
             name: 'ban', 
             module: 'Moderation', 
             aliases: ['b', 'yeet', 'fuckoff', 'getoutofhere', 'bean', 'hackban'],

             helpDetail: 'Bans a user.', 
             helpUsage: '-ban @user [reason]',
             helpExample: '-ban @boss spamming slurs\n-ban @Remmii youre too cute', 
         })
     }

     async execute(client, msg, args) { 
        if (!config.staff.includes(msg.member.id)) { 
            return;
        }
        if (!args.length) { 
            return client.createMessage(msg.channel.id, `${noUser}`)
        }

        let guild = msg.member.guild; 
        let member = resolveUser(guild, msg, args.join(' ')); 

        if (!member) { 
            return client.createMessage(msg.channel.id, `${userError}`)
        }
        if (config.staff.includes(member.id)) { 
            return client.createMessage(msg.channel.id, `${error}You cannot ban yourself!`)
        }

        let reason = args.slice(1).join(' ');
        if (!reason) { 
            reason = 'No reason provided.'
        }

        if (reason === '1') { 
            reason = 'Racial slurs.'
        }
        if (reason === '2') { 
            reason = 'NSFW content.'
        }
        if (reason === '3') { 
            reason = 'Self promotion outside of <#713876168721301566>'
        }
        if (reason === '4') { 
            reason = 'Spamming characters/flooding chat.'
        }
        if (reason === '5') { 
            reason = 'Staff disrespect.'
        }
        if (reason === '6') { 
            reason = 'Arguing with members/staff.'
        }
        if (reason === '7') { 
            reason = 'Spamming/uselessly tagging staff members.'
        }
        if (reason === '8') { 
            reason = 'Excessive swearing.'
        }
        if (reason === '9') { 
            reason = 'Joking about DDoSing, S.W.A.Ting or DOXing people.'
        }
        if (reason === '10') { 
            reason = 'Bot commands in <#713873296680288266>.'
        }
        if (reason === '11') { 
            reason = 'Spreading false information and rumors.'
        }
        if (reason === '12') { 
            reason = 'Threatening/blackmailing users.'
        }
        if (reason === '13') { 
            reason = 'Underaged user.'
        }

        const modlog = { 
            embed: { 
                color: red, 
                footer: { 
                    text: `${msg.member.username}#${msg.member.discriminator}`, 
                    icon_url: `${msg.member.avatarURL}`
                }, 
                timestamp: new Date, 
                fields: [
                    { 
                        name: 'User', 
                        value: `${member.username}#${member.discriminator} (<@${member.id}>)`, 
                        inline: true
                    },
                    { 
                        name: 'Moderator', 
                        value: `${msg.member.username}#${msg.member.discriminator}`, 
                        inline: true
                    }, 
                    { 
                        name: 'Reason', 
                        value: reason
                    }
                ], 
                author: { 
                    name: 'Visionwise Community | Ban'
                }
            }
        }
        client.getDMChannel(member.id).then(c => c.createMessage(`You have been banned in ${msg.channel.guild.name} for: ${reason}`)).then(() => 
               member.ban(1, `[${msg.member.username}#${msg.member.discriminator}] ${reason}`))
                await client.createMessage(msg.channel.id, ':thumbsup:')
                    .catch(err => {
                        if (err) return message.channel.send(`${error}An error has occured! Please contact boss with the error: ${err}`)
                    });

                    client.createMessage(config.modlogChannel, modlog)

     }
}
module.exports.cmd = Ban;