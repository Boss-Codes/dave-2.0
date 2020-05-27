 
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

module.exports.callisto = callisto;

/* New collections for Commands/Events, etc */
callisto.commands = new Collection(Command)
callisto.aliases = new Collection();
callisto.events = new Collection(); 

/* Command Handler */
readdirSync(`./src/Commands/`).forEach(dir => { 
    const commands = readdirSync(`./src/Commands/`).filter(file => file.endsWith('.js'))

    for (let file of commands) { 
        let pull = require(`./src/Commands/${file}`)
        let CmdClass = new pull.cmd()
        callisto.commands.add(CmdClass)
        
    }
    

})
console.log(`[Callisto] [${logDate}] Loaded Commands`)

/* Event Handler */ 
    const events = readdirSync(`./src/Events/`).filter(file => file.endsWith('.js')); 
    for (let file of events) { 
        const evt = require(`./src/Events/${file}`)
    }; 

console.log(`[Callisto] [${logDate}] Loaded Events`)

/* Login */
client.connect()