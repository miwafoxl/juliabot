const constants = require('../constants.json')
const mathjs = require('mathjs')

module.exports = {
    execute: function(Discord,message,args) {
        try {
        let mode = args[1]
        let input = args
        let result
        if(mode == "simple") {
            input.shift()
            input.shift()
            result = mathjs.simplify(input.join(" "))
        } else {
            input.shift()
            result = mathjs.evaluate(input.join(" "))
        }
        const _eval = new Discord.MessageEmbed()
        .setColor(constants.embedcolor)
        .setDescription("= "+result)
        .setTitle(input.join(" "))
        .setFooter(constants.powered2)
        message.channel.send(_eval)
        } catch(err) {
            return err
        }
    }
  }