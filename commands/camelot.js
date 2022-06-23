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
        
        function toNumber(a) {
            let note = a.slice(0,2)
            let c = note.charAt(0).toUpperCase() + note.slice(1);
            let b = zazate.notes.note_to_int(c);
            return b;
        }
        const _camelot1 = new Discord.MessageEmbed()
        .setColor(constants.embedcolor)
        .setTitle(':warning: Nenhuma nota detectada')
        .setDescription('Notas musicais reconhecidas: **C**, C#, Db, **D**, D#, Eb, **E**, **E#**, **F**, F#, Gb, **G**, G#, Ab, **A**, A#, Bb, **B**, **B#**')
        .setFooter("Não consegues entender como funciona? Tente ver os exemplos usando $help camelot")

        let note = args[1];
        let note2 = Number(note);
        let note_isString = isNaN(note2);
        let scale = String(args[2]);

        if(args[1] == undefined)
            message.channel.send(_camelot1)
        if(note_isString == true) {
            let inputNumber = toNumber((args[1]).slice(0,2),message.channel.id)
            
            if(inputNumber == undefined) {
                message.channel.send(_camelot1)
            } else {
                if(scale == 'minor') {
                    let camelotMinor = new Discord.MessageEmbed()
                        .setColor(constants.embedcolor)
                        .setTitle(":information_source: Escalas trancisionárias de "+toNotes(inputNumber)+" minor")
                        .addField('Minor -> Major', toNotes(((12+inputNumber)+3))+' Major')
                        .addField('Sétima (superior)', toNotes(((12+inputNumber)+7))+' Minor', true)
                        .addField('Sétima (inferior)', toNotes(((12+inputNumber)-7))+' Minor', true)
                    message.channel.send(camelotMinor)
                } else if(scale == 'major') {
                    let camelotMajor = new Discord.MessageEmbed()
                        .setColor(constants.embedcolor)
                        .setTitle(":information_source: Escalas trancisionárias de "+toNotes(inputNumber)+" major")
                        .addField('Major -> Minor', toNotes(((12+inputNumber)-3))+' Minor')
                        .addField('Mais próxima (superior)', toNotes(((12+inputNumber)+7))+' Major', true)
                        .addField('Mais próxima (inferior)', toNotes(((12+inputNumber)-7))+' Major', true)
                        message.channel.send(camelotMajor)
                } else if(args[2] == undefined) {
                    let camelotSimple = new Discord.MessageEmbed()
                        .setColor(constants.embedcolor)
                        .setTitle(":information_source: Notas perfeitas de "+toNotes(inputNumber))
                        .addField('Perfect 4th (Quarta perfeita 4:3) (superior)', toNotes(((12+inputNumber)+5))+" (+5 semitons)", true)
                        .addField('Perfect 5th (Quinta perfeita 3:2) (superior)', toNotes(((12+inputNumber)+7))+" (+7 semitons)", true)
                        .addField("\u200B","\u200B")
                        .addField('Perfect 4th (Quarta perfeita 4:3) (inferior)', toNotes(((12+inputNumber)-5))+" (-5 semitons)", true)
                        .addField('Perfect 5th (Quinta perfeita 3:2) (inferior)', toNotes(((12+inputNumber)-7))+" (-7 semitons)", true)
                        .setFooter('Dica: você pode inserir minor/major no comando para mais detalhes (ex. $camelot '+toNotes(inputNumber)+' minor)')
                    message.channel.send(camelotSimple)
                }
            }
        } else {
            message.channel.send(_camelot1)
        }
    }
  }