const eris = require('eris'); 
const { client } = require('../../main.js'); 
const { defaultColor, red } = require('../Core/Utils/Global.js'); 
const config = require('../../config.json'); 
const mongoose = require('mongoose'); 
const Guild = require('../Models/Guild.js'); 

client.on('guildDelete', async (guild) => { 
  
    let owner = client.users.get(guild.ownerID); 

    let model = Guild.findOne({ guildId: guild.id });
    await model.deleteOne()

    if (client.user.id === '564472435336806450') { 
        client.executeWebhook('1045940849202176010', process.env.GUILDWEBHOOK, {

            embeds: [{
                author: { 
                    name: 'Guild Delete', 
                    icon_url: client.user.avatarURL
                }, 
                color: red,
                //@ts-ignore
                description: `**Guild:** ${guild.name} (\`${guild.id})\`\n**Owner:** ${owner.username}#${owner.discriminator}\n**Members:** ${guild.members.size}\n**Guilds:** ${client.guilds.size}`,
                timestamp: new Date 

                }]
        

        
        })
    } else { 
        client.executeWebhook('1052339155083989042', process.env.GUILDWEBHOOKALPHA, { 
            embeds: [{
                author: { 
                    name: 'Guild Delete', 
                    icon_url: client.user.avatarURL
                }, 
                color: red,
                //@ts-ignore
                description: `**Guild:** ${guild.name} (\`${guild.id})\`\n**Owner:** ${owner.username}#${owner.discriminator}\n**Members:** ${guild.members.size}\n**Guilds:** ${client.guilds.size}`,
                timestamp: new Date 

                }]
        })
    }
})