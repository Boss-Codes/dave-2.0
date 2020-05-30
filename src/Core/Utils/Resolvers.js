module.exports = {
    resolveUser: function(guild, msg, search) { 
        let member;
        if(msg.mentions.length){
          member = guild.members.get(msg.mentions[0])
           return member
        }
        
        if(!isNaN(search)) member = guild.members.get(search)
        if(isNaN(search)){
           member = guild.members.find(m => m.user.username.toLowerCase().startsWith(search.toLowerCase())) || 
           guild.members.filter(r => r.nick).find(m => m.nick.toLowerCase().startsWith(search.toLowerCase()))
        }
       return member
    
    }

}