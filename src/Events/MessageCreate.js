const { client } = require('../../main.js'); 
const Guild = require('../Models/Guild.js');

client.on('messageCreate', async msg => {

                let guildProfile = await Guild.findOne({ guildId: msg.channel.guild.id})
                if (client.user.id == '564570881037303819') { 
                    prefix = '.'
                } else { 
                    prefix = guildProfile.prefix
                }
                let devPrefix = '$'


                if (msg.author.bot) return;
                if (msg.content.startsWith(devPrefix) && msg.author.id === "344954369285947392" ? prefix = '$' : prefix = prefix)
                    if (!msg.content.startsWith(prefix)) return
                const messageArray = msg.content.split(' ')
                const commandName = messageArray[0]
                const args = messageArray.slice(1)
                const command = client.commands.get(commandName.toLowerCase().slice(prefix.length)) ||
                    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName.toLowerCase().slice(prefix.length)))
                if (commandName.length === 0) return;
                if (!command) return;
                if (!msg.channel.guild) return;
                if (command) command.execute(client, msg, args)



})