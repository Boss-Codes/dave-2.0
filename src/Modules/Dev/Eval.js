const { Command } = require('../../Core/Classes/Command.js'); 
const config = require('../../../config.json')
const { defaultColor } = require('../../Core/Utils/Global.js')
const { readdirSync } = require('fs')
class Eval extends Command { 
    constructor(){
        super({
            name: 'eval', 
            module: "Dev", 
            aliases: ['evaluate', 'e'], 

            helpDetail: 'Evaluates JavaScript Code', 
            helpUsage: `eval <code>`, 
            helpExample: `eval client.guilds.size`
        });
    }
    
    async execute(client, msg, args) {
        if (!config.developer.includes(msg.author.id)) return;

        const content = msg.content.split(' ').slice(1).join(' ');

        const result = new Promise((resolve, reject) => resolve(eval(content)));

        return result.then(output => {
            if (typeof output !== 'string') output = require('util').inspect(output, {
                depth: 0
            });
            if (output.length > 1900) console.log(output), output = 'The result of this eval is over 2000 characters long and cannot be sent, check the console for the output.'
            const data = { 
                embed: { 
                    author: { name: 'Eval Results', icon_url: msg.author.avatarURL }, 
                    description: "```js\n" + output + "```", 
                    color: defaultColor, 
                    timeStamp: new Date(),
                }
            }
            return client.createMessage(msg.channel.id, data);
        }).catch(err => {
            console.error(err);
            err = err.toString();
            client.createMessage(msg.channel.id, `\`ERROR\` \`\`\`\n${err}\n\`\`\``);
        })

    }
    }

    module.exports.cmd = Eval;