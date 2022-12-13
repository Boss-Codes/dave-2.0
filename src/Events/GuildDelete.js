const { client } = require('../../main.js'); 
const { red } = require('../Core/Utils/Global.js'); 
const Guild = require('../Models/Guild.js'); 

client.on('guildDelete', async (guild) => { 
  
    let owner = client.users.get(guild.ownerID); 

    let model = Guild.findOne({ guildId: guild.id });
    await model.deleteOne()

    if (client.user.id === '564472435336806450') { 
        client.executeWebhook('1045940849202176010', process.env.GUILDWEBHOOK, {

            embeds: [{
                author: { 
                    name: 'Removed', 
                    icon_url: client.user.avatarURL
                }, 
                color: red,
                description: `**ID:** \`${guild.id}\`\n**Name:** \`${guild.name}\`\n**Members:** \`${guild.members.size}\`\n**Owner:** \`${owner.username}#${owner.discriminator}\``,
                timestamp: new Date, 
                footer: { text: `Total Guilds: ${client.guilds.size}` }

                }]
        

        
        })
    } else { 
        client.executeWebhook('1052339155083989042', process.env.GUILDWEBHOOKALPHA, { 
            embeds: [{
                author: { 
                    name: 'Removed', 
                    icon_url: client.user.avatarURL
                }, 
                color: red,
                description: `**ID:** \`${guild.id}\`\n**Name:** \`${guild.name}\`\n**Members:** \`${guild.members.size}\`\n**Owner:** \`${owner.username}#${owner.discriminator}\``,
                timestamp: new Date, 
                footer: { text: `Total Guilds: ${client.guilds.size}` }

                }]
        })
    }
})