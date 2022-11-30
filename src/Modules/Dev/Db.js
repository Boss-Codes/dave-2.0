const { Command } = require('../../Core/Classes/Command.js'); 
const config = require('../../../config.json')
const mongoose = require('mongoose')
const Guild  = require('../../Models/Guild.js');
const { success, error, red, green } = require('../../Core/Utils/Global.js');

class Db extends Command { 
    constructor(){
        super({
            name: 'db', 
            module: "Dev",
            helpDetail: 'Creates/deletes a db entry for a server.', 
            helpUsage: `db`, 
        });
    }
    
    async execute(client, msg, args) {
        if (!config.developer.includes(msg.author.id)) return;
        if (!args[0]) { 
            client.createMessage(msg.channel.id, { 
                embed: { 
                    color: red, 
                    description: `${error} Provide the subcommand \`create\` or \`delete\`!`
                }
            })
        }
        if (args[0] === 'create') {
            let entry = args[1]
            if (!args[1]) { 
                client.createMessage(msg.channel.id, {
                    embed: { 
                        color: red, 
                        description: `${error} Provide a server to create an entry for!`
                    }
                })
            } else {
                let guildProfile = await Guild.findOne({ guildId: entry })
                let server = client.guilds.get(entry)
                let owner = client.users.get(server.ownerID)
                if (!guildProfile) { 
                    guildProfile = await new Guild({
                        _id: mongoose.Types.ObjectId(), 
                        guildId: server.id, 
                        guildName: server.name, 
                        ownerId: server.ownerID,
                        owner: `${owner.username}#${owner.discriminator}`,
                    });
    
                    await guildProfile.save().catch(console.error); 
                    await client.createMessage(msg.channel.id, {
                        embed: { 
                            color: green, 
                            description: `${success} Created entry for: ${guildProfile.guildName} (\`${guildProfile.guildId}\`)`
                        }
                    })
    
            
                } else { 
                    await guildProfile.save().catch(console.error); 
                    await client.createMessage(msg.channel.id, {
                        embed: { 
                            color: red, 
                            description: `${error} A db entry already exists for this server. DB ID: \`${guildProfile._id}\``
                        }
                    })
    
                }
            } 
        }

        if (args[0] === 'delete') {
            let server = args[1]
            if (!args[1]) { 
                client.createMessage(msg.channel.id, {
                    embed: { 
                        color: red, 
                        description: `${error} Provide a server to delete an entry for.`
                    }
                })
            }
            let guildProfile = await Guild.findOne({ guildId: server })
            if (guildProfile) { 
                guildProfile.deleteOne()
                await client.createMessage(msg.channel.id, {
                    embed: {
                        color: green, 
                        description: `${success} Successfully deleted database entry for server: ${client.guilds.get(args[1]).name} (\`${args[1]}\`)`
                    }
                })
            } else { 
                client.createMessage(msg.channel.id, {
                    embed: {
                        color: red, 
                        description: `${error} Server does not exist in database!`
                    }
                })
            }
        }
        
        
    }
};
module.exports.cmd = Db;