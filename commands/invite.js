const constants = require('../constants.json')

module.exports = {
    execute: function(Discord,message) {
        const _invite = new Discord.MessageEmbed()
        .setColor(constants.embedcolor)
        .setAuthor("Julia "+constants.version)
        .setTitle(':information_source: Deseja me adicionar em outro servidor? Clique aqui (~˘▾˘)')
        .setURL(constants.invite)

        message.channel.send(_invite)
    }
  }