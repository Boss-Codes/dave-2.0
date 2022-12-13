const { Command } = require('../../Core/Classes/Command.js'); 
const config = require('../../../config.json')
const mongoose = require('mongoose')
const Guild  = require('../../Models/Guild.js');
const Global = require('../../Models/Global.js');
const User = require('../../Models/User.js'); 
const { success, error, red, green } = require('../../Core/Utils/Global.js');

class Db extends Command { 
    constructor(){
        super({
            name: 'db', 
            module: "Dev",
            userPerms: 'Dev',
            helpDetail: 'Creates/deletes a db entry for a server/user/global.', 
            helpUsage: `db <create | delete> <server | user | global> [user ID | server ID]`,
        });
    }
    
    async execute(client, msg, args) {
       // args[0] would be the sub command create/delete 
       // args[1] would be the sub command server/user 
       // args[2] would be the user/server id 

       if (!config.developer.includes(msg.author.id)) return; 
       if (!args[0]) { 
        client.createMessage(msg.channel.id, { embed: { color: red, description: `${error} Provide the subcommand \`create\` or \`delete\`!` } })
       }
       if (args[0] === 'create') { 
        let entry = args[1]    
        if (!entry) { 
            client.createMessage(msg.channel.id, { embed: { color: red, description: `${error} Provide the subcommand \`user\`, \`server\`, or \`global\`!` } })
        }
   
        if (entry === 'server') { 
            let arg = args[2]
            if (!arg) return client.createMessage(msg.channel.id, { embed: { color: red, description: `${error} Provide a server ID to create a database entry for!`}})
            let guildProfile = await Guild.findOne({guildId: arg})
            let server = client.guilds.get(arg) 
            let owner = client.users.get(server.ownerID)
            if (!guildProfile) { 
                guildProfile = await new Guild({
                    _id: mongoose.Types.ObjectId(), 
                    guildId: server.id, 
                    guildName: server.name, 
                }); 

                await guildProfile.save().catch(console.error); 
                await client.createMessage(msg.channel.id, { embed: { color: green, description: `${success} Successfully created database entry for: ${guildProfile.guildName} (\`${guildProfile.guildId}\`)`}})
            } else { 
                await guildProfile.save().catch(console.error)
                await client.createMessage(msg.channel.id, { embed: { color: red, description: `${error} A database entry already exists for this server.\nDB ID: \`${guildProfile._id}\``}})
            }
        }
        
        if (entry === 'user') { 
            let arg = args[2]
            if (!arg) return client.createMessage(msg.channel.id, { embed: { color: red, description: `${error} Provide a user ID to create a database entry for!`}})

            let userProfile = await User.findOne({id: arg})
            let user = client.users.get(arg)
            if (!userProfile) { 
                userProfile = await new User({
                    id: user.id, 
                    user: `${user.username}#${user.discriminator}`
                })

                await userProfile.save().catch(console.error)
                await client.createMessage(msg.channel.id, { embed: { color: green, description: `${success} Successfully created database entry: ${userProfile.user} (\`${userProfile.id}\`)`}})
            } else { 
                await userProfile.save().catch(console.error)
                await client.createMessage(msg.channnel.id, { embed: { color: red, description: `${error} Database entry already exists for this user.`}})
            }
        }

        if (entry === 'global') { 
            let global = await Global.findOne({})
            if (!global) { 
                global = await new Global({
                }); 

                await global.save().catch(console.error); 
                await client.createMessage(msg.channel.id, { embed: { color: green, description: `${success} Successfully created global database!`}})
            } else { 
                await global.save()
                await client.createMessage(msg.channel.id, { embed: { color: red, description: `${error} Global database entry already exists!`}})
            }
        }

    }

    if (args[0] === 'delete') { 
        let entry = args[1]    
        if (!entry) { 
            client.createMessage(msg.channel.id, { embed: { color: red, description: `${error} Provide the subcommand \`user\`, \`server\`, or \`global\`!` } })
        }
   
        if (entry === 'server') { 
            let arg = args[2]
            if (!arg) return client.createMessage(msg.channel.id, { embed: { color: red, description: `${error} Provide a server ID to delete a database entry for!`}})
            let guildProfile = await Guild.findOne({guildId: arg})
            if (guildProfile) { 
                guildProfile.deleteOne()
                await client.createMessage(msg.channel.id, { embed: { color: green, description: `${success} Successfully deleted database entry for: ${client.guilds.get(arg).name} (\`${arg}\`)`}})
            } else { 
                await guildProfile.save().catch(console.error)
                await client.createMessage(msg.channel.id, { embed: { color: red, description: `${error} Server does not exist in database!`}})
            }
        }
        
        if (entry === 'user') { 
            let arg = args[2]
            if (!arg) return client.createMessage(msg.channel.id, { embed: { color: red, description: `${error} Provide a user ID to delete a database entry for!`}})

            let userProfile = await User.findOne({id: arg})
            let user = client.users.get(arg)
            if (userProfile) { 
                userProfile.deleteOne()
                await client.createMessage(msg.channel.id, { embed: { color: green, description: `${success} Successfully delete database entry: ${user.username}#${user.discriminator} (\`${user.id}\`)`}})
            } else { 
                await userProfile.save().catch(console.error)
                await client.createMessage(msg.channnel.id, { embed: { color: red, description: `${error} User does not exist in the database!`}})
            }
        }

        if (entry === 'global') { 
            let global = await Global.findOne({})
            if (global) { 
                global.deleteOne()

                await client.createMessage(msg.channel.id, { embed: { color: green, description: `${success} Successfully deleted global database!`}})
            } else { 
                await global.save()
                await client.createMessage(msg.channel.id, { embed: { color: red, description: `${error} Global database entry does not exist!`}})
            }
        }

    }

    }
};
module.exports.cmd = Db;