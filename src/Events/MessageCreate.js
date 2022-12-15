const { channel } = require('diagnostics_channel');
const Eris = require('eris');
const { client } = require('../../main.js'); 
const Guild = require('../Models/Guild.js');

client.on('messageCreate', async msg => {
  // modmail with alpha bot.
    if (msg.author.bot) return;
    if (msg.channel.guild === undefined && msg.channel.type === undefined && client.user.id === '564570881037303819') { 
        let homeServer = client.guilds.get('1043755488157913189')
        let u = homeServer.members.get(msg.author.id);
        if (!u) return;

        let ch = homeServer.channels.filter(c => c.name === msg.author.username + '-' + msg.author.discriminator).map(c => c.id).join(' ')
        let channel = homeServer.channels.get(ch)

        if (!channel) { 
        homeServer.createChannel(`${msg.author.username}-${msg.author.discriminator}`, 0, { parentID: '1052372328018870374', topic: msg.author.id }).then(c => { 
            c.createMessage(`**New Thread Opened: ${msg.author.username}#${msg.author.discriminator} (\`${msg.author.id}\`)**`)
            c.createMessage('**---------------------------------------**')
            c.createMessage(`**${msg.author.username}#${msg.author.discriminator}**: ${msg.content}`)
            c.createMessage(`⚙️**Modmail:** Thank you for your message! A member of our staff team will reply to you as soon as possible.`)
        })
            
        client.getDMChannel(msg.author.id).then(c => { 
            c.createMessage('Thank you for your message! A member of our staff team will reply to you as soon as possible.')
       })
        } else { 
        let ch = homeServer.channels.filter(c => c.name === msg.author.username + '-' + msg.author.discriminator).map(c => c.id).join(' ')
        let channel = homeServer.channels.get(ch)            
        client.createMessage(channel.id, `**${msg.author.username}#${msg.author.discriminator}**: ${msg.content}`)
    }
    }

// real shit 
    if((msg.channel.type === 0 || msg.channel.type === 5)) {
        let guildProfile = await Guild.findOne({ guildId: msg.channel.guild.id})
        if (client.user.id == '564570881037303819') { 
            prefix = '.' && '-'
        } else if (msg.author.id === '344954369285947392') { 
            prefix = '$' && guildProfile.prefix
        } else { 
            prefix = guildProfile.prefix 
        } 
        let devPrefix = '>'

        if (msg.author.bot) return;
        if (msg.content.startsWith(devPrefix) && msg.author.id === "344954369285947392" ? prefix = '$' : prefix = guildProfile.prefix)
        if (!msg.content.startsWith(prefix)) return
        const messageArray = msg.content.split(' ')
        const commandName = messageArray[0]
        const args = messageArray.slice(1)
        const command = client.commands.get(commandName.toLowerCase().slice(prefix.length)) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName.toLowerCase().slice(prefix.length)))
        if (commandName.length === 0) return;
        if (!command) return;
        if (command) command.execute(client, msg, args)
    }


})