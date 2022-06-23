const constants = require('../constants.json')
const musicfsn = require('music-fns');
const scales = ["algerian","altered","arabic","augmented","balinese","blues","byzantine","chinese","chromatic","double_harmonic","enigmatic","major_gypsy","minor_harmonic","hirajoshi","in_sen","japanese","major_pentatonic","major","minor_melodic","minor_pentatonic","mongolian","minor","pelog","prometheus","whole_tone","yo"]
module.exports = {
    execute: function(client,Discord,message,args) {
        const _camelot1 = new Discord.MessageEmbed()
            .setColor(constants.embedcolor)
            .setTitle(':warning: Nenhuma nota detectada')
            .setDescription('Notas musicais reconhecidas: **C**, C#, Db, **D**, D#, Eb, **E**, **E#**, **F**, F#, Gb, **G**, G#, Ab, **A**, A#, Bb, **B**, **B#**')
            .setFooter("Não consegues entender como funciona? Tente ver os exemplos usando $help scale")

        const _scale1 = new Discord.MessageEmbed()
            .setColor(constants.embedcolor)
            .setTitle(':warning: Escala inválida')
            .setDescription('Veja abaixo a lista de escalas reconhecidas')
            .addField("Escalas disponíveis", scales.join(", "))
            .setFooter("Não consegues entender como funciona? Tente ver os exemplos usando $help scale")
    
        let note = args[1]
        scale = args[2]
        let s
        if(musicfsn.isNote(note) == true) {
            
            if(scales.indexOf(scale) !== -1) {
                if(scale == "algerian") {
                    s = musicfsn.createScale(note,musicfsn.Scale.ALGERIAN, { includeRootEnd: true })
                } else if(scale == "altered") {
                    s = musicfsn.createScale(note,musicfsn.Scale.ALTERED, { includeRootEnd: true })
                    
                } else if(scale == "arabic") {
                    s = musicfsn.createScale(note,musicfsn.Scale.ARABIC, { includeRootEnd: true })
                    
                } else if(scale == "balinese") {
                    s = musicfsn.createScale(note,musicfsn.Scale.BALINESE, { includeRootEnd: true })
                    
                } else if(scale == "blues") {
                    s = musicfsn.createScale(note,musicfsn.Scale.BLUES, { includeRootEnd: true })
                    
                } else if(scale == "byzantine") {
                    s = musicfsn.createScale(note,musicfsn.Scale.BYZANTINE, { includeRootEnd: true })
                    
                } else if(scale == "chinese") {
                    s = musicfsn.createScale(note,musicfsn.Scale.CHINESE, { includeRootEnd: true })
                    
                } else if(scale == "chromatic") {
                    s = musicfsn.createScale(note,musicfsn.Scale.CHROMATIC, { includeRootEnd: true })
                    
                } else if(scale == "double_harmonic") {
                    s = musicfsn.createScale(note,musicfsn.Scale.DOUBLE_HARMONIC, { includeRootEnd: true })
                    
                } else if(scale == "enigmatic") {
                    s = musicfsn.createScale(note,musicfsn.Scale.ENIGMATIC, { includeRootEnd: true })
                    
                } else if(scale == "major_gypsy") {
                    s = musicfsn.createScale(note,musicfsn.Scale.GYPSY_MAJOR, { includeRootEnd: true })
                    
                } else if(scale == "minor_harmonic") {
                    s = musicfsn.createScale(note,musicfsn.Scale.HARMONIC_MINOR, { includeRootEnd: true })
                    
                } else if(scale == "hirajoshi") {
                    s = musicfsn.createScale(note,musicfsn.Scale.HIRAJOSHI, { includeRootEnd: true })
                    
                } else if(scale == "in_sen") {
                    s = musicfsn.createScale(note,musicfsn.Scale.IN_SEN, { includeRootEnd: true })
                    
                } else if(scale == "japanese") {
                    s = musicfsn.createScale(note,musicfsn.Scale.JAPANESE, { includeRootEnd: true })
                    
                } else if(scale == "major") {
                    s = musicfsn.createScale(note,musicfsn.Scale.MAJOR, { includeRootEnd: true })
                    
                } else if(scale == "minor_melodic") {
                    s = musicfsn.createScale(note,musicfsn.Scale.MELODIC_MINOR, { includeRootEnd: true })
                    
                } else if(scale == "minor_pentatonic") {
                    s = musicfsn.createScale(note,musicfsn.Scale.MINOR_PENTATONIC, { includeRootEnd: true })
                    
                } else if(scale == "mongolian") {
                    s = musicfsn.createScale(note,musicfsn.Scale.MONGOLIAN, { includeRootEnd: true })
                    
                } else if(scale == "minor") {
                    s = musicfsn.createScale(note,musicfsn.Scale.NATURAL_MINOR, { includeRootEnd: true })
                    
                } else if(scale == "pelog") {
                    s = musicfsn.createScale(note,musicfsn.Scale.PELOG, { includeRootEnd: true })
                    
                } else if(scale == "prometheus") {
                    s = musicfsn.createScale(note,musicfsn.Scale.PROMETHEUS, { includeRootEnd: true })
                    
                } else if(scale == "whole_tone") {
                    s = musicfsn.createScale(note,musicfsn.Scale.WHOLE_TONE, { includeRootEnd: true })
                    
                } else if(scale == "yo") {
                    s = musicfsn.createScale(note,musicfsn.Scale.YO, { includeRootEnd: true })
                    
                } else {
                    message.channel.send(_scale1)
                }
                return [s,message.channel.id,note+" "+scale];
                    
            
            } else {
                message.channel.send(_scale1)
            }
        } else {
            message.channel.send(_camelot1)
        }
    }
  }