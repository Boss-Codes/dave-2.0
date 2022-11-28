const { Command } = require('../../Core/Classes/Command.js'); 
const config = require('../../../config.json')
const { success, green } = require('../../Core/Utils/Global.js')
const { exec } = require('child_process')
const { inspect } = require('util')
let date = new Date()
let logDate = date.toLocaleDateString(); 
let logTime = date.toLocaleTimeString('en-US',{timeZone:'America/New_York'})

class Restart extends Command { 
    constructor(){
        super({
            name: 'restart', 
            module: "Dev", 
            aliases: ['r', 'boot'], 

            helpDetail: 'Restarts the bot', 
            helpUsage: `restart`, 
        });
    }
    
    async execute(client, msg, args) {
        if (!config.developer.includes(msg.author.id)) return;
        
        client.createMessage(msg.channel.id, `<a:mGear:1046881466015039589> Restarting Metis!`).then(message => {
            exec('pm2 restart Metis', (error, stdout) => {
            })
        })


    }
};
module.exports.cmd = Restart;