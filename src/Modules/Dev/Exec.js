const { Command } = require('../../Core/Classes/Command.js'); 
const config = require('../../../config.json')
const { error } = require('../../Core/Utils/Global.js')
const { exec } = require('child_process')
const { inspect } = require('util')
class Exec extends Command { 
    constructor(){
        super({
            name: 'exec', 
            module: "Dev", 
            aliases: ['ex', 'execute'], 

            helpDetail: 'Executes console code.', 
            helpUsage: `exec <code>`, 
            helpExample: `exec pm2 restart metis`
        });
    }
    
    async execute(client, msg, args) {
        if (!config.developer.includes(msg.author.id)) return;
        
        await exec(args.join(' '), (error, stdout) => { 
            const outputType = error || stdout; 
            let output = outputType; 
            if (typeof outputType === 'object') {
                output = inspect(outputType); 
            }
            let stringOutput = String(output); 
            if (stringOutput.length > 1990) console.log (output), output = 'The result of this exec is over 2000 characters long and cannot be sent. Check the console for output.'
            output = output = "```" + output + "```"
            return client.createMessage(msg.channel.id, output)
        })
    }
    }

    module.exports.cmd = Exec;