const { Command } = require('../../Core/Classes/Command.js'); 
const { error, red, green } = require('../../Core/Utils/Global.js'); 

class Color extends Command { 
    constructor() { 
        super({
            name: 'color', 
            module: 'Info', 
            userPerms: 'User', 
            helpDetail: 'Displays a color based on the HEX code provided.', 
            helpUsage: 'color <hex code>', 
            helpExample: 'color bbaaee'
        })
    }

    async execute(client, msg, args) { 
        let cRegex = /^#?([a-f0-9]{6}|[a-f0-9]{3})/gim 
        let color = args[0] 
        if (!color) { 
            client.createMessage(msg.channel.id,{
                embed: { 
                    color: red, 
                    description: `${error} Provide a color!`
                }
            })
        }
        if (color[0] === '#') color = color.substring(1)
        if (color.length > 6) return client.createMessage(msg.channel.id, {
            embed: { 
                color: red, 
                description: `${error} Hex code too long!`
            }
        })
        let cDec = parseInt(color, 16)
        let isColor = cRegex.test(color)
        if (isColor) { 
            return client.createMessage(msg.channel.id, { 
                embed: { 
                    author: {
                        name: 'Color', 
                    }, 
                    description: `Color: #${color}`, 
                    color: cDec, 
                    thumbnail: { 
                        url: `https://dummyimage.com/600x400/${color}/fff&text=M`
                    }
                }
            })
        } else { 
            return client.createMessage(msg.channel.id, { 
                embed: { 
                    color: red, 
                    description: `${error} Invalid color provided!`
                }
            })
        }
    }
}

module.exports.cmd = Color;