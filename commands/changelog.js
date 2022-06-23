const constants = require('../constants.json')

module.exports = {
    execute: function(Discord,message) {
        const changelog = new Discord.MessageEmbed()
            .setColor(constants.embedcolor)
            .setAuthor("Julia "+constants.version)
            .setTitle(":information_source: Changelog "+constants.version)
            .addField(":green_square: Novo comando: $frequency","Calcula a frequência exata de uma nota.")
            .addField(":yellow_square: $calculate","Resultado é mostrado na descrição do Embed ao invés de mostrar no título.")
            .addField(":yellow_square: $difference","Corrigido um Bug onde mostrava NaN em certas combinações")
        message.channel.send(changelog)
    }
  }