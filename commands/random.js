const constants = require('../constants.json')
const zazate = require('zazate.js');

module.exports = {
    execute: function(Discord,message,args) {
        function toNotes(a) {
            let note = a
            let b = a
            if(a >= 12) {
                if(a-12 >= 12) {
                    b = zazate.notes.int_to_note(a-24);
                } else {
                    b = zazate.notes.int_to_note(a-12);
                }
            } else {
                b = zazate.notes.int_to_note(a);
            }
            
            return b;
        }
        function toScale(a) {
            if(a === 0) {
                return "Minor";
            }
            if(a === 1) {
                return "Major";
            }
            if(a === 2) {
                return "Dorian";
            }
            if(a === 3) {
                return "Pentatonic";
            }
            if(a === 4) {
                return "Arabic";
            }
            else return undefined
        }
        if(args[1] === "bpm") {
            let random_bpm = Math.floor(Math.random() * 100) + 76
            let randombpm = new Discord.MessageEmbed()
                .setColor(constants.embedcolor)
                .setTitle(":information_source: "+random_bpm+" BPM")
                .setFooter('BPM aleatório')
            message.channel.send(randombpm)
        } else if(args[1] === "key") {
            let random_key = Math.floor(Math.random() * 13);
            let random_scale = Math.floor(Math.random() * 5);
            let randomkey = new Discord.MessageEmbed()
                .setColor(constants.embedcolor)
                .setTitle(":information_source: "+toNotes(random_key)+" "+toScale(random_scale))
                .setFooter('Escala aleatória')
            message.channel.send(randomkey)
        } else {
            let random_bpm = Math.floor(Math.random() * 100) + 76
            let random_key = Math.floor(Math.random() * 13);
            let random_scale = Math.floor(Math.random() * 5);
            let random = new Discord.MessageEmbed()
                .setColor(constants.embedcolor)
                .setTitle(":information_source: "+random_bpm+" BPM")
                .setDescription(toNotes(random_key)+" "+toScale(random_scale))
                .setFooter('BPM e escala aleatória')
            message.channel.send(random)
    }
    }
  }