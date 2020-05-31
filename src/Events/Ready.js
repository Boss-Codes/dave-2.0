const eris = require('eris'); 
const { client } = require('../../main.js'); 
const { defaultColor } = require('../Core/Utils/Global.js')
const config = require('../../config.json'); 
let logTime = new Date().toLocaleTimeString(); 
let logDate = new Date().toLocaleDateString()
client.on('ready', async () => {
  client.editStatus('online', {
    name: `the visionwise community!`,
    type: 3
  })

  client.executeWebhook('715423630229504064', config.readyWebhook, {

    embeds: [{
      author: {
        name: 'Ready',
        icon_url: client.user.avatarURL
      },
      color: `${defaultColor}`,

      description: `Connected to Discord!\n**Guilds:** ${client.guilds.size}\n**Users:** ${client.users.size}\n**Time:** ${logDate} (${logTime})`
    }]




  })
  return console.log(`[Botski] [${logTime}] Connected to Discord`)
})