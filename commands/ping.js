const constants = require('../constants.json')

module.exports = {
    execute: async function(Discord,message) {
        const ping = new Discord.MessageEmbed()
			.setColor(constants.embedcolor)
			.setAuthor("Julia "+constants.version)
			.setTitle(":information_source: Testando latência...")
        const m = await message.channel.send(ping);
        let pingms = m.createdTimestamp-message.createdTimestamp 
		
        m.edit(new Discord.MessageEmbed()
			.setColor(constants.embedcolor)
			.setAuthor("Julia "+constants.version)
			.setTitle(":information_source: "+pingms+" ms")
			.setFooter("Obs: A latência pode oscilar muito de vez em quando. Use $help ping para saber mais."))
    }
  }