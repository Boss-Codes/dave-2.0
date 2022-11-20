const { Command } = require('../../Core/Classes/Command.js'); 
const config = require('../../../config.json')
const { prefix } = require('../../Core/Utils/Global.js')
class Eval extends Command { 
    constructor(){
        super({
            name: 'eval', 
            module: "Dev", 
            aliases: ['e', 'evaluate'], 

            helpDetail: 'Evaluates JavaScript Code', 
            helpUsage: `${config.prefix}eval <code>`, 
            helpExample: `${config.prefix
            }eval client.guilds.size`
        });
    }
    
    async execute(client, msg, args) {
        if (!config.developers.includes(msg.author.id)) return;
        const content = msg.content.split(' ').slice(1).join(' ');
        const result = new Promise((resolve, reject) => resolve(eval(content)));

        return result.then(output => {
            if (typeof output !== 'string') output = require('util').inspect(output, {
                depth: 0
            });
            if (output.includes(client.token)) output = output.replace(client.token, "NoUQ4Nzk4NoUM3NTY5NjA1NjUy.DxNoYOU3w.B9F3nQm6xJJ4NoUfK60ZWduRbNoU");
            if (output.length > 1990) console.log(output), output = 'The result of this eval is over 2000 characters long and cannot be sent, check the console for the output.'

            return client.createMessage(msg.channel.id, `\`\`\`js\n${output}\`\`\``);
        }).catch(err => {
            console.error(err);
            err = err.toString();

            if (err.includes(client.token)) err = err.replace(client.token, "NoUQ4Nzk4NoUM3NTY5NjA1NjUy.DxNoYOU3w.B9F3nQm6xJJ4NoUfK60ZWduRbNoU");

            return client.createMessage(msg.channel.id, `\`\`\`js\n${err}\`\`\``);
        });
    }
    }

    module.exports.cmd = Eval;