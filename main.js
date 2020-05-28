 
/* 
* Visionwise-Bot 
* Copyright 2020 @boss#0001
*/

/* Requiring Stuff Needed  */
const { Client, Collection } = require('eris'); 
const { Command } = require('./src/Core/Classes/Command.js')
const { config } = require('dotenv'); 
let logDate = new Date().toLocaleTimeString(); 
const { fs, readdir, readdirSync } = require('fs'); 
config({
    path: __dirname + '/.env'
});
const client = new Client(process.env.TOKEN,{
    disableEveryone: true, 
    getAllUsers: true, 
    messageLimit: 100,
    restMode: true, 
    autoreconnect: true, 
    defaultImageFormat: 'png', 
    defaultImageSize: 2048
});

module.exports.client = client;

/* New collections for Commands/Events, etc */
client.commands = new Collection(Command)
client.aliases = new Collection();
client.events = new Collection(); 

/* Command Handler */
readdirSync(`./src/Modules/`).forEach(dir => { 
    const commands = readdirSync(`./src/Modules/${dir}/`).filter(file => file.endsWith('.js'))

    for (let file of commands) { 
        let pull = require(`./src/Modules/${dir}/${file}`)
        let CmdClass = new pull.cmd()
        client.commands.add(CmdClass)
        
    }
    

})
console.log(`[Moderation] [${logDate}] Loaded Commands`)

/* Event Handler */ 
    const events = readdirSync(`./src/Events/`).filter(file => file.endsWith('.js')); 
    for (let file of events) { 
        const evt = require(`./src/Events/${file}`)
    }; 

console.log(`[Moderation] [${logDate}] Loaded Events`)

/* Login */
client.connect()