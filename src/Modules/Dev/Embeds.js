const { Command } = require('../../Core/Classes/Command.js'); 
const { defaultColor, online, idle, dnd, offline } = require('../../Core/Utils/Global.js'); 
const config = require('../../../config.json'); 
const { GuildTemplate } = require('eris');

class Embeds extends Command {
    constructor(){
        super({
            name: 'embeds', 
            module: 'Dev', 
            userPerms: 'Developer', 
            helpDetail: 'Sends a whole wad of fuckin embeds for the main support server like wooooosh sheeeeeeeeeeeeeesssshh'
        })
    }

    async execute(client, msg, args) { 
        if (!msg.member.id === '344954369285947392') return; 
        
        const welcome = {
            embed: {
                author: { 
                    name: `${msg.channel.guild.name}`,
                    url: 'https://discord.com/api/oauth2/authorize?client_id=564472435336806450&permissions=8&scope=bot',
                    icon_url: `${msg.channel.guild.iconURL}`
                }, 
                color: `${defaultColor}`,
                tite: 'Welcome to the Metis Support Server!',
                description: 'Welcome to our support server. Here you can find an array of resources to help you use our bot Metis! Feel free to check out our <#1045616349545775164> channel and be sure to read the rules below as well as check out <#1045614500029665290> and <#1045614519164092476>!'
            }       
        }
        const rules = {
            embed: {
                author: {
                    name: 'Metis', 
                    icon_url: `${msg.channel.guild.iconURL}`
                },
                title: 'Server Rules',
                color: defaultColor, 
                description: 'This server abides by Discord\'s ToS and Community Guidelines.\n[Discord\'s Terms of Service](https://discord.com/terms)\n[Discord\'s Community Guidelines](https://discord.com/guidelines)\n\nWe want this server to be a nice, friendly space!\nIf you see something against the rules or that makes you uncomfortable, feel free to DM <@!564570881037303819> and someone will be able to help you accordingly.',
                fields: [{
                    name: 'Rule 1 - No NSFW', 
                    value: 'Zero tolerance for NSFW / NSFL content / discussions.\n(This inclides usernames and avatars)'
                },
                {
                    name: 'Rule 2 - Be respectful', 
                    value: 'There is zero tolerance for drama, racism, hate speech, or hatred towards any user. Negative remarks on other bots are also not tolerated.'
                }, 
                {
                    name: 'Rule 3 - No spamming or self-promotions', 
                    value: 'Any spam or promotions within the server or DMs are not allowed. If you receive anything like this, please report it to <@!564570881037303819> (with a picture of mutual servers and full DM history).'
                }, 
                {
                    name: 'Rule 4 - English is the primary language of this server', 
                    value: 'If you need help with Metis in another language, please feel free to DM <@!564570881037303819> or use a translator in #support.'
                }, 
                {
                    name: 'Rule 5 - No inappropriate names or impersonations of staff/bots', 
                    value: 'Your name may not contain inappropriate/annoying text or formatting. Impersonation of staff, Metis, and other bots may result in a ban.'
                }, 
                {
                    name: 'Rule 6 - Staff may moderate at their discretion', 
                    value: 'Nothing is perfect, that includes our rules list. Any loopholes will not be tolerated. We may moderate anything not on this list that we deem inappropriate. Use your common sense and do not complain when the staff team tries to keep the server a calm and safe environment.'
                }, 
                {
                    name: 'Support Guidelines', 
                    value: 'If you would like to provide Metis support to other in our support channels, please see the pins in <#1045616349545775164> for some resources and guidelines on doing so.'
                }],
                footer: {
                    text: 'Revised 11-25-2022 @ 3:45 A.M.'
                }
            }, 
            
        }

        const links = {
            embed: {
                author:{
                    name: 'Important Links', 
                    icon_url: `${msg.channel.guild.iconURL}`
                },
                color: defaultColor,
                fields: [{
                    name: 'Server Invite', 
                    value: 'https://discord.gg/mePghx6dQy'
                }, 
                {
                    name: 'Bot Invite', 
                    value: '[Invite](https://discord.com/api/oauth2/authorize?client_id=564472435336806450&permissions=8&scope=bot)'

                },
                {
                    name: 'GitHub - Want to check out the code for yourself?', 
                    value: '[Repo-Link](https://github.com/Boss-Codes/metis)'
                }
            ]
            }
        }

        const roles = {
            embed: {
                author:{
                    name: 'Server Roles', 
                    icon_url: `${msg.channel.guild.iconURL}`
                },
                color: defaultColor,
                fields: [{
                    name: 'Staff Roles', 
                    value: '<@&1043755665933475840> - The developer that codes and maintains the bot.\n<@&1045607827370160179> - Makes policies and manages the staff team.\n <@&1045607714572750848> - Helps with staff training and recruiting.\n<@&1045607763260211251> - Issues moderations for members not abiding by the rules.\n<@&1045607755693707324> - Staff members that answer questions in #support. Do **__NOT__** mention this role for support.'
                }, 
                {
                    name: 'Self-Assignable Roles', 
                    value: '<@&1045612820391264266> - Gives you access to #api_changelog and #api_support.\n<@&1045612970710941747> - Will notify you of certain updates to Metis.\n<@&1045613006626770944> - Hides certain log channels.\n<@&1045613283035586600> - Hides #bot_commands.'
                },
                {
                    name: 'Other Roles', 
                    value: '<@&1045607805576564806> - Non-staff members who have been trusted to give support due to their knowledge of the bot and the guidelines for giving support. This role is exempt from a few of the support guidelines and often receives staff-guided help in support. Please feel free to DM a Senior Staff member if you feel you are worthy enough for this role.\n<@&1045607859750174751> - The regular member role.\n<@&1043784791490830416> - Other bots that help us support the server.'
                }
            ]
            }
        }

        const supportGuide = {
            embed: {
                author:{
                    name: 'Support Guidelines', 
                    icon_url: `${msg.channel.guild.iconURL}`
                },
                color: defaultColor, 
                description: "Welcome to the #support channel! We encourage anyone to help out as long as they feel comfortable doing so and have appropriate knowledge of the feature they are assisting with. Please follow these guidelines when assisting users:\n\n`-` All support should take place within this server.\n`--` Do not ask for or accept an invite to a user's server to assist them. Only <@&1045607805576564806>+ are allowed to join servers for support.\n`--` Please do not DM users to help them or accept DMs from users looking for support. You may redirect them to a support channel. If they won't listen to you, ask a <@&1045607763260211251>.\n\n`-` If you are not sure about the answer or can't figure out a problem, 🛑 **STOP**. Ask for help from a <@&1045607755693707324>+ member or let a <@&1045607805576564806> assist. It is ok to ask for help, we were all new once.\n\n`-` **Support is best 1 on 1**.  If a user is already helping someone, please let them. If you think you have a more appropriate answer or you think they gave incorrect information, you may mention them in another channel (such as #bot_commands) to let them know. If they decline your help, don't continue to push the matter. If you think someone is giving false information or may cause severe issues in a user's server, please report the incident to <@&564570881037303819> (Metis Alpha#7663).\n\n`-` <@&1045607755693707324>+ have the final say on any matter in support. If they instruct you to do something, do it.\n\nIf you have any questions about Metis or the support channels, don't hesitate to ask. **Thank you** for helping improve users' experiences with Metis and for making their communities better!"
            }
        }

        const status = {
            embed: {
                author:{
                    name: 'Metus Status', 
                    icon_url: `${msg.channel.guild.iconURL}`
                },
                color: defaultColor,
                description: "If there is an ongoing issue with Metis, please be patient and wait for Metis to return.\n\nMetis may be offline in some servers, but online in others.\nTo know for sure when it's back online for you, try using the `!ping` command **in your server**.\n\nDuring a downtime, neither the staff nor developers here will be able to tell you when it will be fixed in your server. Please follow the updates posted in this channel or try to use Metis in your server.\n\nThanks for your patience!"
            }
        }

        const selfAssign = {
            embed: {
                author:{
                    name: 'Self-Assignable Roles', 
                    icon_url: `${msg.channel.guild.iconURL}`
                },
                color: defaultColor,
                description: "<:ffAnnounce:1045627529651830794> <@&1045612970710941747> - Mentions you for certain updates regarding the bot.\n\n:no_entry_sign: <@&1045613006626770944> - Hides <#1043756356122984508> and <#1043756453200134184>.\n\n:no_entry: <@&1045613283035586600> - Hides <#1045616591611637790>.\n\n<:ffSupport:1045627958590722118> <@&1045612820391264266> - Gives you access to api channels: <#1045613978153402430> and <@&1045616391828541510>"
            }
        }
        

        // rules channel 
        client.createMessage('1045611229282054205', welcome)
        client.createMessage('1045611229282054205', rules)
        // // support channel 
        // client.createMessage('1045616349545775164', supportGuide)
        // // faq channel 
        // client.createMessage('1045614500029665290', links)
        // client.createMessage('1045614500029665290', roles)
        // // self-assign roles 
        // client.createMessage('1045614519164092476', selfAssign)
        // // status channel 
        // client.createMessage('1045614099184238632', status)
        return client.createMessage(msg.channel.id, ':thumbsup:')
    }
}
module.exports.cmd = Embeds;
