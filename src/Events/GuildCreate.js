const eris = require('eris'); 
const { client } = require('../../main.js'); 
const { defaultColor, green, red } = require('../Core/Utils/Global.js'); 
const config = require('../../config.json'); 
const mongoose = require('mongoose'); 
const Guild = require('../Models/Guild.js'); 
const { formatDate } = require('../Core/Utils/Functions.js');

client.on('guildCreate', async (guild) => { 
  
    let owner = client.users.get(guild.ownerID); 

    let guildModel = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildId: guild.id, 
        guildName: guild.name, 
        ownerId: guild.ownerID, 
        owner: `${owner.username}#${owner.discriminator}`
    })

    await guildModel.save().catch(console.error)

    if (client.user.id === '564472435336806450') { 
        client.executeWebhook('1045940849202176010', process.env.GUILDWEBHOOK, {

            embeds: [{
                author: { 
                    name: 'Added', 
                    icon_url: client.user.avatarURL
                }, 
                color: green,
                description: `**ID:** \`${guild.id}\`\n**Name:** \`${guild.name}\`\n**Members:** \`${guild.members.size}\`\n**Owner:** \`${owner.username}#${owner.discriminator}\`\n**Created At**: \`${formatDate(guild.createdAt)}\``,
                timestamp: new Date, 
                footer: { text: `Total Guilds: ${client.guilds.size}` }

                }]
        

        
        })
    } else { 
        client.executeWebhook('1052339155083989042', process.env.GUILDWEBHOOKALPHA, { 
             
            embeds: [{
                author: { 
                    name: 'Added', 
                    icon_url: client.user.avatarURL
                }, 
                color: green,
                description: `**ID:** \`${guild.id}\`\n**Name:** \`${guild.name}\`\n**Members:** \`${guild.members.size}\`\n**Owner:** \`${owner.username}#${owner.discriminator}\`\n**Created At**: \`${formatDate(guild.createdAt)}\``,
                timestamp: new Date, 
                footer: { text: `Total Guilds: ${client.guilds.size}` }

                }]
        })
    }
})