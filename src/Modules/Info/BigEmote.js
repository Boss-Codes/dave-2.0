const { Command } = require('../../Core/Classes/Command.js'); 
const { error, red, defaultColor, modules } = require('../../Core/Utils/Global.js'); 

class BigEmote extends Command { 
    constructor() { 
        super({
            name: 'big-emote', 
            module: 'Info', 
            aliases: ['big', 'hugeify', 'huge-emote'], 
            userPerms: 'User', 
            helpDetail: 'Displays a big image of a specified emoji.', 
            helpUsage: 'big-emote <emoji>', 
            helpExample: 'big-emote '
        });
    };

    async execute(client, msg, args) { 
        if (!args[0]) return client.createMessage(msg.channel.id, { embed: { color: red, description: `${error} Provide an emote to make bigger!` } });
        const emote = msg.member.guild.emojis.find(e => e.name === args[0]) || msg.member.guild.emojis.find(e => e.name.toLowerCase().startsWith(args[0].toLowerCase())); 
        if (!emote) return client.createMessage(msg.channel.id, { embed: { color: red, description: `${error} Invalid emote!` } })
        let link = `https://cdn.discordapp.com/emojis/${emote.id}.webp?size=128&quality=lossless`
        if (emote.animated) link = `https://cdn.discordapp.com/emojis/${emote.id}.gif?size=128&quality=lossless`
        client.createMessage(msg.channel.id, { embed: { image: { url: link}, title: `Emote: ${emote.name}`, color: defaultColor } })
    };
};
module.exports.cmd = BigEmote;