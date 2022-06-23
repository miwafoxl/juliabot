const constants = require('../constants.json')
const mathjs = require('mathjs')

module.exports = {
    execute: function(Discord,message,fullargs) {
        let input = fullargs
        let result = mathjs.evaluate(fullargs)
    }
  }