const eris = require('eris'); 
const { client } = require('../../main.js'); 
const { defaultColor, green } = require('../Core/Utils/Global.js'); 
const config = require('../../config.json'); 
let date = new Date()
let logDate = date.toLocaleDateString(); 
let logTime = date.toLocaleTimeString('en-US',{timeZone:'America/New_York'})
client.on('ready', async () => { 
    client.editStatus('online', {
        name: `!help | ${client.guilds.size} guilds `,
        type: 0
    })

    client.executeWebhook('1043789410006740995', process.env.READYWEBHOOK, {

        embeds: [{
            color: `${green}`, 

            description: `\`${logDate}  ${logTime}\` <@!${client.user.id}> [CONNECTED] Shard: \`1\``
        }]
    
    
    })
    console.log(`[Metis] [${logTime}] Connected to Discord!`)
})