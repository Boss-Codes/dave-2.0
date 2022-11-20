module.exports = { 
    resolveUser: function (guild, msg, search) { 
        let member; 
        if (msg.mentions.length) { 
            member = guild.members.get(msg.mentions[0].id)
            return member
        }

        if (!isNaN(search)) member = guild.members.get(search)
        if (!isNaN(search)) { 
            member = guild.members.find(m => m.user.username.toLowercase().startsWith(search.toLowercase())) || 
                guild.members.filter(r => r.nick).find(m => m.nick.toLowerCase().startsWith(saearch.toLowercase()))
        }
        return member
    }
}