const constants = require('../constants.json')
const musicfsn = require('music-fns');
const zazate = require('zazate.js');
const { NaN, isInteger } = require('mathjs');



module.exports = {
    execute: function(Discord,message,args) {
        const _camelot1 = new Discord.MessageEmbed()
            .setColor(constants.embedcolor)
            .setTitle(':warning: Nenhuma nota detectada')
            .setDescription('Notas musicais reconhecidas: **C**, C#, Db, **D**, D#, Eb, **E**, **E#**, **F**, F#, Gb, **G**, G#, Ab, **A**, A#, Bb, **B**, **B#**')
            .addField("Observação","Especificamente para esse comando ($frequency), você pode por o número da oitava. (ex: C5)")
            .setFooter("Não consegues entender como funciona? Tente ver os exemplos usando $help frequency")

        const _frequency = new Discord.MessageEmbed()
            .setColor(constants.embedcolor)
            .setTitle(':warning: A4 inválido')
            .setDescription('A4 deve ser um número entre 432 Hz e 446 Hz')
            .setFooter("Não consegues entender como funciona? Tente ver os exemplos usando $help frequency")
        // comando
        try {
        const defaultA4 = 440
        const defaultOct = 4
        
        let usernote = args[1]
        let a4 = args[2]
        let ext = args[3]

        let note
        let octave
        let extended = false

        // checa se é um numero, se for ele manda erro
        if (!isNaN(usernote)) {
            message.channel.send(_camelot1)
            return
        }

        // checa se o usuário definiu o comando de extensão
        if (ext === "ext") {
            extended = true
        }
        if (a4 === "ext") {
            a4 = defaultA4
            extended = true
        }

        // checa se é uma nota, se for ele separa a nota e a oitava em 2 variaveis
        if(musicfsn.isNote(usernote)) {
            note = musicfsn.getNote(usernote)
            octave = musicfsn.getOctave(usernote)
        } else {
            // se não for uma nota valida ele manda erro
            message.channel.send(_camelot1)
            return
        }

        // se caso a musicfsn não souber reconhecer e passar, ele checa se a nota é undefined e manda erro se for
        // ele tbm checa se a oitava foi estabelecida, se não foi ele coloca 4
        if(note == undefined) {
            message.channel.send(_camelot1)
            return
        } else if(octave == undefined) {
            octave = defaultOct
        }
        
        // Anti Bugs

        // checa se o valor de a4 definido pelo usuário não existe ou não é um numero
        // nos dois casos ele coloca o a4 padrão (440)
        if(a4 == undefined || isNaN(a4)) {
            a4 = defaultA4
        }

        // se a oitava for desnecessariamente alta ele seta pra 4
        let octaveError = false
        if(octave > 12) {
            octave = defaultOct
            octaveError = true
        }

        // procedimento final, confere se a4 é maior q 432 e menor q 446 e faz todo o calculo
        if(a4 < 432 || a4 > 446) {
            message.channel.send(_frequency)
        } else {
            let frequency = musicfsn.noteToFrequency(String(note+octave), { standard: Number(a4) })
            const freq = new Discord.MessageEmbed()
                .setColor(constants.embedcolor)
                if(extended){
                    freq.setTitle(':information_source: '+String(frequency)+' Hz' )
                    freq.setDescription('Frequência de '+note+octave+' em '+a4+' Hz (extendido)')
                } else {
                    freq.setTitle(':information_source: '+String(frequency).slice(0,7)+' Hz' )
                    freq.setDescription('Frequência de '+note+octave+' em '+a4+' Hz')
                }
                if(octaveError){
                    freq.setFooter('Tente utilizar oitavas menores que 12.')
                }

            message.channel.send(freq)
        }

        } catch(err) {
            if(err == undefined) {
                
            } else {
                return err;
            }
            
        }
    }
  }