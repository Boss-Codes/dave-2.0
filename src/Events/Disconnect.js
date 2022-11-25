const eris = require('eris'); 
const { client } = require('../../main.js'); 
const { red, green } = require('../Core/Utils/Global.js'); 
const config = require('../../config.json'); 
const { Shard } = require('eris');
let date = new Date()
let logDate = date.toLocaleDateString(); 
let logTime = date.toLocaleTimeString('en-US',{timeZone:'America/New_York'})
client.on('disconnect', async () => { 
  
    client.executeWebhook('1043789410006740995', config.readyWebhook, {

        embeds: [{
            color: `${red}`, 

            description: `\`${logDate}  ${logTime}\` <@!564570881037303819> [DISCONNECTED] Shard: \`1\``
        }]
    
    
    })
    return console.log(`[Metis] [${logTime}] Shard 1 Disconnected!`)
})