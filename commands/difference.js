const constants = require('../constants.json')
const musicfsn = require('music-fns');
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
        const _dif = new Discord.MessageEmbed()
        .setColor(constants.embedcolor)
        .setTitle(':warning: As notas são iguais')
        .setDescription('Bruh momentaneo')
        .setFooter("Não consegues entender como funciona? Tente ver os exemplos usando $help difference")  

        const _camelot1 = new Discord.MessageEmbed()
        .setColor(constants.embedcolor)
        .setTitle(':warning: Nenhuma nota detectada')
        .setDescription('Notas musicais reconhecidas: **C**, C#, Db, **D**, D#, Eb, **E**, **E#**, **F**, F#, Gb, **G**, G#, Ab, **A**, A#, Bb, **B**, **B#**')
        .setFooter("Não consegues entender como funciona? Tente ver os exemplos usando $help difference")
        
        let note1 = (String(args[1]).slice(0,2)).toUpperCase()
        let note2 = (String(args[2]).slice(0,2)).toUpperCase()
        let note3 = [(note1+"1"),(note2+"1")] 
        if(musicfsn.areEqual(note3) == true) {
            message.channel.send(_dif)
            return
        } 

        if(musicfsn.isNote(note3[0]) == false) {
            message.channel.send(_camelot1)
            return
        } 
        if(musicfsn.isNote(note3[1]) == false) {
            message.channel.send(_camelot1)
            return
        } 
        let note4 = musicfsn.normalize(note3)
        note4.pop()
        if(musicfsn.isNote(note4[0]) == true) {
            if(musicfsn.isNote(note4[1]) == true) {
                let noteAA = note4[0]
                let noteBB = note4[1]
                
                let noteA = (toNumber((noteAA.slice(0,(noteAA.length-1)))))
                let noteB = (toNumber((noteBB.slice(0,(noteBB.length-1)))))

                let result1 = new Number
                let result2 = new Number

                let interval = new Number
                let results = new Array

                let final = new String
                let final2 = new String
                let greater = false
                if(noteA >= noteB) {
                    result1 = noteB
                    result2 = noteA
                    greater = true
                } else if(noteB >= noteA) {
                    result1 = noteA
                    result2 = noteB
                }
                results = [(toNotes(result1)+"1"),(toNotes(result2)+"1")]

                interval = musicfsn.getIntervals(results)
                if(interval < 6) {
                    final = interval
                    final2 = (Number(interval))*100
                } else if(interval > 6) {
                    final = interval-12
                    final2 = (Number(interval-12))*100
                } else if(interval == 6) {
                    final = "6 ou -6"
                    final2 = ((Number(6))*100)+" ou diminuir "+((Number(-6))*100)
                }
                console.log(interval, final)
                if(greater == true) {
                    if(!isNaN(final)) {
                        final = final*-1
                    }
                    
                }
                let dif = new Discord.MessageEmbed()
                    .setColor(constants.embedcolor)
                    .setTitle(":information_source: Diferença entre "+note1+" e "+note2)
                    .addField('Mais próxima', final+" semitons", true)
                    if(Math.sign((final)) == 1) {
                        dif.setFooter('Você pode acrescentar '+final2+' cents')
                    }

                    else if(Math.sign((final)) == -1) {
                        dif.setFooter('Você pode diminuir '+final2+' cents')
                    } else {
                        dif.setFooter('Você pode acrescentar '+final2+' cents')
                    }
                    
                    message.channel.send(dif)
                } else {
                        message.channel.send(_camelot1)
                    }
            } else {
                message.channel.send(_camelot1)
    }
    }
  }