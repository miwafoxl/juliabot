const constants = require('../constants.json')

module.exports = {
    execute: function(Discord,message,args) {

        const _bpm = new Discord.MessageEmbed()
            .setColor(constants.embedcolor)
            .setTitle(':warning: Sintáxe incorreta')
            .setDescription('Usagem correta: $bpm <triplet/sec> <get/convert> <insira um bpm>')
            .setFooter("Não consegues entender como funciona? Tente ver os exemplos usando $help bpm")

        const _bpm2 = new Discord.MessageEmbed()
            .setColor(constants.embedcolor)
            .setTitle(':warning: BPM inválido')
            .setDescription('BPM deve ser um número')
            .setFooter("Não consegues entender como funciona? Tente ver os exemplos usando $help bpm")

        const _bpm3 = new Discord.MessageEmbed()
            .setColor(constants.embedcolor)
            .setTitle(':warning: Você não inseriu um modo <get/convert>')
            .setDescription('Usagem correta: $bpm <triplet/sec> <get/convert> <insira um bpm>')
            .setFooter("Não consegues entender como funciona? Tente ver os exemplos usando $help bpm")
        
        let a
        let b
        let type = args[1] // triplet //sec // signature
        let mode = args[2] //get //convert
        let bpm = args[3] //bpm em numeros
        var _types = ["triplet","sec"]
        // checagem das variaveis colocadas pelo usuário
        if(_types.indexOf(type) !== -1) {
            a = type
        } else {
            message.channel.send(_bpm)
            return
        }
        var _modes = ["get","convert"]
        if(_modes.indexOf(mode) !== -1) {
            b = mode
        } else {
            message.channel.send(_bpm3)
            return
        }
        if(isNaN(bpm)) {
            message.channel.send(_bpm2)
            return
        }
        // cálculos
        if(a == "triplet") {
            if(b == "get") {
                var bpmtriplet = (bpm*3)/4
                let result = new Discord.MessageEmbed()
                .setColor(constants.embedcolor)
                .setTitle(":information_source: "+bpmtriplet+" BPM")
                .setFooter('BPM triplet de '+bpm+' BPM')
                message.channel.send(result)
            } else if(b == "convert") {
                var bpmtriplet = (bpm/3)*4
                let result = new Discord.MessageEmbed()
                .setColor(constants.embedcolor)
                .setTitle(":information_source: "+bpmtriplet+" BPM")
                .setFooter('BPM normal de triplets em '+bpm+' BPM')
                message.channel.send(result)
            }
        } else if(a == "sec") {
            if(b == "get") {
                var bpmsecondcalc = ((60000/bpm))
                let result = new Discord.MessageEmbed()
                .setColor(constants.embedcolor)
                .setTitle(":information_source: "+bpmsecondcalc+" ms")
                .setFooter(' Duração de 1 bar em '+bpm+' BPM')
                message.channel.send(result)
            } else if(b == "convert") {
                var bpmsecondcalc = ((60000/bpm)).toFixed(3)
                let result = new Discord.MessageEmbed()
                .setColor(constants.embedcolor)
                .setTitle(":information_source: "+bpmsecondcalc+" BPM~")
                .setFooter(' BPM de '+bpm+' ms (1 bar)')
                message.channel.send(result)
            }
        }
    }
  }