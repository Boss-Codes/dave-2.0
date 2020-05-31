class Command {
  constructor(data) {
    this.name = data.name
    this.id = this.name;
    this.module = data.module
    this.aliases = data.aliases
    this.helpDetail = data.helpDetail
    this.helpUsage = data.helpUsage
    this.helpExample = data.helpExample

  }
  async execute() {

  }


}
module.exports.Command = Command