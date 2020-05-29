const { Command } = require('../../Core/Classes/Command.js'); 
const { defaultColor } = require('../../Core/Utils/Global.js'); 
const { resolveUser } = require('../../Core/Utils/Resolvers.js'); 
const config = require('../../../config.json'); 

class Id extends Command { 
    constructor(){
        super({
            name: 'numbers', 
            module: 'Moderation', 

            userperms: 'User',
            helpDetail: 'Sends rule numbers for mod commands.', 
            helpUsage: 'numbers', 
        })
    }

    async execute(callisto, msg, args) { 
        const data = { 
            embed: { 
                description: `1: Racial slurs.\n2: NSFW content.\n3: Self promotion outside of <#713876168721301566>\n4: Spamming characterse/flooding channels.\n5: Staff disrespect.\n6: Arguing with members/staff.\n7: Spamming/uselessy tagging staff members.\n8: Excessive swearing.\n9: Joking about DDoSing, S.W.A.Ting, or DOXing people.\n10: Bot commands in <#713873296680288266>\n11: Spreading false information and rumors.\n12: Threatening/blackmailing users.\n13: Underaged user.`, 
                author: { 
                    name: 'Moderation Command Reason Numbers'
                }, 
                timestamp: new Date
            }
        }
        callisto.createMessage(msg.channel.id, data)
    }
}
module.exports.cmd = Id;