const constants = require('../constants.json')

module.exports = {
    execute: function(Discord,message) {
        let array = new Array;
  
        for (i = 0; i < 48; i++) {
          if(i > 2) {
            array[i] = (array[i-1])+(array[i-2])
            } else {
              array[i] = 1*i
              }
        }
        for (i = 0; i < 48; i++) {
            array[i] = "`"+array[i].toLocaleString()+"`"
          }
        let fibonacci = new Discord.MessageEmbed()
        .setColor(constants.embedcolor)
        .setTitle(":information_source: Sequência Fibonacci")
        .addField("48 caractéres",array.join(" | "))
        .setFooter('Fibonacci Sequence')
        message.channel.send(fibonacci)
    }
  }