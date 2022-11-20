/*
* FairFight™ Jr. 
* © 2022 Boss-Codes 
*/

/* Constants */
const { Client, Collection } = require('eris'); 
const { Command } = require('./src/Core/Classes/Command.js'); 
const { config } = require('dotenv'); 
let date = new Date()
let logDate = date.toLocaleDateString(); 
let logTime = date.toLocaleTimeString('en-US',{timeZone:'America/New_York'})

const { fs, readdir, readdirSync } = require('fs'); 
config({
    path: __dirname + '/.env'
});
const client = new Client(process.env.TOKEN, {
    getAllUsers: true, 
    messageLimit: 100, 
    restMode: true, 
    autoreconnect: true, 
    defaultImageFormat: 'png', 
    defaultImageSize: 2048, 
    intents: ['all']
}); 

module.exports.client = client; 

/* New collections for Commands/Events, etc */ 
client.commands = new Collection(Command); 
client.aliases = new Collection(); 
client.events = new Collection(); 

/*Command Handler */
readdirSync(`./src/Modules`).forEach(dir => { 
    const commands = readdirSync(`./src/Modules/${dir}`).filter(file => file.endsWith('js'))

    for (let file of commands) { 
        let pull = require(`./src/Modules/${dir}/${file}`)
        let CmdClass = new pull.cmd 
        client.commands.add(CmdClass)
    }

});
console.log(`[FairFight™ Jr.] [${logTime}] Loaded Commands`)

/* Event Handler */ 
const events = readdirSync(`./src/Events`).filter(file => file.endsWith('.js'))
for (let file of events) { 
    const evt = require(`./src/Events/${file}`)
};

console.log(`[FairFight™ Jr.] [${logTime}] Loaded Events`)


/* Login */
client.connect()