const constants = require('../constants.json')

module.exports = {
    execute: function(Discord,message,argscase) {
        let note = argscase[1]
        if(typeof(note) == 'undefined') {
            message.channel.send(_chord)
        } else {
            return [note,message.channel.id]
        }
    }
  }