class Command { 
    constructor(data) { 
        this.name = data.name || 'unnamed'
        this.id = this.name
        this.module = data.module || 'default'
        this.aliases = data.aliases || 'None'
        this.userPerms = data.userPerms || 'User'
        this.helpDetail = data.helpDetail || 'Some waz lazy!! :('
        this.helpUsage = data.helpUsage 
        this.helpExample = data.helpExample

    }
    async execute() { 
    }
}
module.exports.Command = Command