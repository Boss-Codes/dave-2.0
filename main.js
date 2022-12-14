/*
* Metis
* © 2022 Boss-Codes 
*/

/* Constants */
const { Client, Collection } = require('eris'); 
const { Command } = require('./src/Core/Classes/Command.js'); 
const { config } = require('dotenv'); 
const { fs, readdir, readdirSync } = require('fs'); 
const { mongoose } = require('mongoose');
let date = new Date()
let logDate = date.toLocaleDateString(); 
let logTime = date.toLocaleTimeString('en-US',{timeZone:'America/New_York'})

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
    intents: ['all'], 
    allowedMentions: {everyone: false, roles: true, users: true}
}); 

module.exports.client = client; 

/* New collections for Commands/Events, etc */ 
client.commands = new Collection(Command); 
client.aliases = new Collection(); 
client.events = new Collection(); 
client.modules = readdirSync('./src/Modules').length

/*DB*/
function db() {
    mongoose.connect(process.env.MONGOLOGIN, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        dbName: 'metis'
    });
    mongoose.connection.on('error', () => {
        console.log(`[Metis] [${logTime}] Failed to connect to MongoDB`)
    });
    mongoose.connection.on('open', () => {
        console.log(`[Metis] [${logTime}] Connected to MongoDB`)
    })
}

/*Command Handler */
readdirSync(`./src/Modules`).forEach(dir => { 
    const commands = readdirSync(`./src/Modules/${dir}`).filter(file => file.endsWith('js'))

    for (let file of commands) { 
        let pull = require(`./src/Modules/${dir}/${file}`)
        let CmdClass = new pull.cmd 
        client.commands.add(CmdClass)
    }
});
console.log(`[Metis] [${logTime}] Loaded Commands`)

/* Event Handler */ 
const events = readdirSync(`./src/Events`).filter(file => file.endsWith('.js'))
for (let file of events) { 
    const evt = require(`./src/Events/${file}`)
};

console.log(`[Metis] [${logTime}] Loaded Events`)

/* Login */
db()
client.connect()
