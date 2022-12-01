module.exports = { 
    formatDate: function (date) { 
        return new Intl.DateTimeFormat('en-us').format(date)
    },
    sortRoles: function (roles) { 
        roles.sort((a, b) => b.position - a.position)
    },
    filterRoles: function (roles) { 
        roles.filter(r => r.id != msg.member.guild.id)
    }
}