const { Command } = require('../../Core/Classes/Command.js'); 
const { green, yellow, userError, noUser, error } = require('../../Core/Utils/Global.js'); 
const { resolveUser } = require('../../Core/Utils/Resolvers.js'); 
const config = require('../../../config.json'); 
const { stripIndents } = require('common-tags'); 
const ms = require('ms'); 
const schedule = require('node-schedule'); 

class Mute extends Command {
     constructor(){
         super({
             name: 'mute', 
             module: 'Moderation', 
             aliases: ['m'],

             helpDetail: 'Mutes a user.', 
             helpUsage: '-mute @user [time] [reason]',
             helpExample: '-mute @boss 24h spamming\n-mute @Remmii youre too cute', 
         })
     }

     async execute(client, msg, args) { 
        if (!config.helpers.includes(msg.member.id)) return;
        if (!args.length) { 
            return client.createMessage(msg.channel.id, `${noUser}`)
        }

        let guild = msg.member.guild; 
        let member = resolveUser(guild, msg, args.join(' ')); 
        if (!member) { 
            let member = guild.members.get(search)
         }
        if (!member) { 
            return client.createMessage(msg.channel.id, `${userError}`)
        }
        if (config.staff.includes(member.id)) { 
            return client.createMessage(msg.channel.id, `${error}You cannot mute yourself!`)
        }

        let reason = args.slice(2).join(' ');
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

        const muterole = msg.channel.guild.roles.get('713888164208574477'); 
        const timeImput = args[1]; 
        if (!timeImput) { 
            return client.createMessage(msg.channel.id, `${error}Don't be a coward, set a length!`)
        }
        const length = ms(timeImput); 
        const time = ms(length)
        const seconds = length/1000
        const date = new Date(Date.now() + length)

        const modlog = { 
            embed: { 
                color: yellow, 
                footer: { 
                    text: `ID: ${member.id}`
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
                        name: 'Length', 
                        value: `${time}`, 
                        inline: true
                    },
                    { 
                        name: 'Reason', 
                        value: reason
                    }
                ], 
                author: { 
                    name: `Mute | ${member.username}#${member.discriminator}`, 
                    icon_url: member.avatarURL 
                }
            }
        }
        const unmute = { 
            embed: { 
                color: green, 
                footer: { 
                    text: `ID: ${member.id}`
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
                        value: `Botski#4230`, 
                        inline: true
                    }, 
                    { 
                        name: 'Reason', 
                        value: 'Automatic unmute.'
                    }
                ], 
                author: { 
                    name: `Mute | ${member.username}#${member.discriminator}`, 
                    icon_url: member.avatarURL
                }
            }
        }
        member.addRole(muterole.id).then(() => 
        client.getDMChannel(member.id).then(c => c.createMessage(`You have been muted in ${msg.channel.guild.name} for: ${reason}`)))
                await client.createMessage(msg.channel.id, `:thumbsup: muted for ${seconds} seconds`)
                    .catch(err => {
                        if (err) return message.channel.send(`${error}An error has occured! Please contact boss with the error: ${err}`)
                    });

                    client.createMessage(config.modlogChannel, modlog)

        schedule.scheduleJob(`mute_time_${member.id}`, date, function() { 
            member.removeRole(muterole.id)
            client.getDMChannel(member.id).then(c => c.createMessage(`You have been unmuted in ${msg.channel.guild.name}. Please take time to re-read over <#713872065316388874> again so you do not get muted once more.`))
            client.createMessage(config.modlogChannel, unmute)
           
        })
     }
}
module.exports.cmd = Mute;
