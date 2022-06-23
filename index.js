/*

    código antigo afrente (2020), prossiga no seu próprio risco
    também algumas coisas mudaram no discord.js então talvez
    não funcione direito.............. perdão :woozy_face:

*/

const fs = require('fs');

const Discord = require("discord.js");
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(file.slice(0,-3), command);
}

const jimp = require('jimp');
const zazate = require('zazate.js');
const musicfsn = require('music-fns');
const config =  require("./config.json");
const constants = require("./constants.json");

var presence = setInterval(newPresence,300000)

function newPresence() {
    let a = Math.floor(Math.random() * (15+1))
    console.log("Presence set to "+a)
    switch(a) {
        case 0:
            client.user.setActivity('Minecraft', { type: 'PLAYING' });
        case 1:
            client.user.setActivity('Violino', { type: 'PLAYING' });
        case 2:
            client.user.setActivity('Piano', { type: 'PLAYING' });
        case 3:
            client.user.setActivity('Hytale', { type: 'PLAYING' });
        case 4:
            client.user.setActivity('SPACE LACES', { type: 'LISTENING' });
        case 5:
            client.user.setActivity('EM3S1N', { type: 'LISTENING' });
        case 6:
            client.user.setActivity('Flottantacq', { type: 'LISTENING' });
        case 7:
            client.user.setActivity('pato a morte', { type: 'LISTENING' });
        case 8:
            client.user.setActivity('ZERO ARION', { type: 'PLAYING' });
        case 9:
            client.user.setActivity('Hentai', { type: 'WATCHING' });
        case 10:
            client.user.setActivity('extasy', { type: 'LISTENING' });
        case 11:
            client.user.setActivity('jeset prunkies', { type: 'LISTENING' });
        case 12:
            client.user.setActivity('sungazer', { type: 'LISTENING' });
        case 13:
            client.user.setActivity('o edo', { type: 'WATCHING' });
        case 14:
            client.user.setActivity('edo pufavo me da um pao', { type: 'LISTENING' });
        case 15:
            client.user.setActivity('Vinheteiro', { type: 'LISTENING' });
    }
}


function errorCatch(a,b) {
    let error = a;
    let channelid = client.channels.cache.get(b);
    const errorembed = new Discord.MessageEmbed()
    .setColor(constants.embedcolor)
    .setTitle(":warning: Deu Ruim")
    .setDescription('```'+error+'```')
    .setFooter("Algum problema? Qualquer problema favor contatar-me SPACE FOX#2564")
    channelid.send(errorembed)
    }

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

function notesImage(s,a,c) {
    let chordarray = s
    let chords = new Array // cria uma array vazia pra ser preenchida pelo loop a seguir
    let chordname = c

    var i; // loopindex do loop
    var imax = chordarray.length; // aqui ele pega o número total de elementos do array de notas desfragmentado ([C, D#, G] = 3)
    for(i = 0;i < imax; i++) {  
        chords[i] = toNumber(chordarray[i]) //converte as notas pra numeros (C = 0, C# = 1 ... B = 11, C = 0)
    }
    gerarImagem(chords,a,chordname)
}

function gerarAcorde(a,b) {
    try {
    let chord = a.charAt(0).toUpperCase() + a.slice(1); // capitalizaçãO (cm > Cm)
    let chordarray = zazate.chords.from_shorthand(chord)
    let chords = new Array // cria uma array vazia pra ser preenchida pelo loop a seguir
    let chordname = zazate.chords.determine(chordarray)
    console.log(chordname)

    var i; // loopindex do loop
    var imax = chordarray.length; // aqui ele pega o número total de elementos do array de notas desfragmentado ([C, D#, G] = 3)
    for(i = 0;i < imax; i++) {  
        chords[i] = toNumber(chordarray[i]) //converte as notas pra numeros (C = 0, C# = 1 ... B = 11, C = 0)
    }

    let channelid = b // ignorar: só contem o id do canal

    gerarImagem(chords,channelid,chordname) // após desfragmentar e converter pra números, ele chama essa função par gerar a imagem
    } catch(err) {
        errorCatch(err,b)
    }
}

async function gerarImagem($a,$b,$c) {
    let a = $a // carrega a array com os números da função anterior
    let channelid = client.channels.cache.get($b)  // ignorar: carrega a id do canal
    let background = await jimp.read('png/fl_studio/fl_background.png') // carrega o fundo 
    let nota = await jimp.read('png/fl_studio/fl_note.png') // carrega a foto da nota pra por encima do fundo
    let b = a
    let invertWarn = false
    let chordname = $c
    try {
    if (Array.isArray(chordname) == true) {
        chordname = $c[0]   
    } else {
        chordname = String($c)
    }
    var i; // loopindex do loop
    var imax = b.length // pega o número total de elementos do array de numeros ([0, 3, 5] = 3)
    for(i = 0; i < imax; i++) {
        if (b[i] < b[i - 1] && i != 0){
            if((12 + a[i]) >= 24) {
                b[i] = a[i];
                invertWarn = true
            } else {
                b[i] = 12 + a[i];
            }
        } else {
            b[i] = a[i];
        }
        background.composite(nota, 74, (581-(24*(b[i])))) // coloca as notas na imagem
    }
    let filename = 'lastChord.png';
    let file = 'lastChord.png';

    background.write(file) // depois de por ele salva pra pn
    var _chordImage = new Discord.MessageEmbed()
        .setColor(constants.embedcolor)
        .setTitle(':information_source: '+chordname.toUpperCase())
        .attachFiles(file)
        .setImage('attachment://'+filename)
        .setFooter(constants.powered1)

    var _chordImage2 = new Discord.MessageEmbed()
        .setColor(constants.embedcolor)
        .setTitle(':information_source: '+chordname.toUpperCase())
        .attachFiles(file)
        .setImage('attachment://'+filename)
        .setFooter(constants.powered1)

    if(invertWarn == true) {
        channelid.send(_chordImage2)
    } else {
        channelid.send(_chordImage)
    }
    } catch(err) {
        errorCatch(err,$b)
    }

}
const scales = ["algerian","altered","arabic","augmented","balinese","blues","byzantine","chinese","chromatic","double_harmonic","enigmatic","major_gypsy","minor_harmonic","hirajoshi","in_sen","japanese","major_pentatonic","major","minor_melodic","minor_pentatonic","mongolian","minor","pelog","prometheus","whole_tone","yo"]

const _help = new Discord.MessageEmbed()
    .setColor(constants.embedcolor)
    .setAuthor("Julia "+constants.version)
    .setTitle(":information_source: Lista de Comandos")
    .setDescription("Você também pode usar ```$help (comando)``` para detalhes.")
    .addField("`$changelog` (`$novidades` ou `$log`)","Mostra novidades da minha última versão.")
    .addField("`$invite` (`$convidar` ou `$inv`)","Envia o link de convite, para adicionar-me em outros servidores.")
    .addField("\u200B","\u200B")
    .addField("`$bpm <triplet/sec> <get/convert> <insira um bpm>`","Calcula e converte variações de BPM.")
    .addField("`$camelot <insira uma nota> (minor/major)`","Calcula as notas perfeitas ou escalas transcionárias de uma escala/nota.")
    .addField("`$calculate (simple) <insira uma expressão>`","Calcula/simplifica uma expressão matemática")
    .addField("`$chord <insira um acorde (ex. Dm11)>`","Representa o acorde introduzido em MIDI.")
    .addField("`$difference <insira uma nota> <insira outra nota>`","Calcula a diferença em semitons entre duas notas.")
    .addField("`$fibonacci`","Calcula a sequência de Fibonacci e mostra 48 números.")
    .addField("`$frequency <insira uma nota> (insira a frequência A4) (ext)`","Calcula a frequência exata de uma nota.")
    .addField("`$random (key/bpm)`","Aleatoriza uma escala e/ou BPM.")
    .addField("`$scale <insira uma nota> <insira uma escala>`","Representa a escala introduzida em MIDI.")
    .setFooter('<> = argumentos obrigatórios // () = argumentos opcionais - SPACE FOX#2564')
client.on("ready", () => {
    console.log(`:: Julia online. / ${client.users.cache.size} pessoas em ${client.guilds.cache.size} servidores`)
    console.log(commandFiles)
    newPresence()
});
client.on('error', console.error);

client.on('message', async message => {
    if(message.author.bot) return;
    let prefix = message.content.slice(0,1)
    if(prefix != config.prefix) return;
    
    const args = (message.content.toLowerCase()).slice(1).split(" ")
    const argscase = (message.content).slice(1).split(" ")
    
    console.log(args)

    var $ping = ["ping","p","pi"]
    if($ping.indexOf(args[0]) !== -1) {
        client.commands.get('ping').execute(Discord,message)
    }
    var $changelog = ["changelog","novidades","log"]
    if($changelog.indexOf(args[0]) !== -1) {
        client.commands.get('changelog').execute(Discord,message)
    }
    var $bpm = ["bpm","b"]
    if($bpm.indexOf(args[0]) !== -1) {
        client.commands.get('bpm').execute(Discord,message,args)
    }
    var $scale = ["scale","key","k"]
    if($scale.indexOf(args[0]) !== -1) {
        let scale = client.commands.get('scale').execute(client,Discord,message,args)
        notesImage(scale[0],scale[1],scale[2])
    }
    var $chord = ["chord","chords","acorde","ch"]
    if($chord.indexOf(args[0]) !== -1) {
        let note = client.commands.get('chord').execute(Discord,message,argscase)
        gerarAcorde(note[0],note[1])
    } 
    var $fibonacci = ["fibonacci","fib","f"]
    if($fibonacci.indexOf(args[0]) !== -1) {
        client.commands.get('fibonacci').execute(Discord,message,args)
    }
    var $frequency = ["frequency","freq","hz"]
    if($frequency.indexOf(args[0]) !== -1) {
        let frequency = client.commands.get('frequency').execute(Discord,message,args)
        if(frequency !== undefined) {
            errorCatch(frequency,message.channel.id)
        }
    }
    var $difference = ["difference","dif","di"]
    if($difference.indexOf(args[0]) !== -1) {
        client.commands.get('difference').execute(Discord,message,args)
    }
    var $random = ["random","any","r"]
    if($random.indexOf(args[0]) !== -1) {
        client.commands.get('random').execute(Discord,message,args)
    }
    var $invite = ["invite","inv","in","convidar","convite"]
    if($invite.indexOf(args[0]) !== -1) {
        client.commands.get('invite').execute(Discord,message)
    }
    var $camelot = ["camelot","cam","c"]
    if($camelot.indexOf(args[0]) !== -1) {
        client.commands.get('camelot').execute(Discord,message,args)
    }
    var $calculate = ["calculate","calc","eval","w"]
    if($calculate.indexOf(args[0]) !== -1) {
        let calc = client.commands.get('calculate').execute(Discord,message,args)
        if(calc !== undefined) {
            errorCatch(calc,message.channel.id  )
        }
    }
    var $help = ["help","h","?","a","ajuda"]
    if($help.indexOf(args[0]) !== -1) {
        let comando = args[1];
        
        if($ping.indexOf(comando) !== -1) {
            let help_ping = new Discord.MessageEmbed()
            .setColor(constants.embedcolor)
            .setAuthor("Detalhes do comando")
            .setTitle(":information_source: $ping")
            .setDescription("Mostra a latência na qual me encontra atuando-na.")
            .addField("Oscilações na latência","A Julia não é hosteada por mim pois eu não teria como manter ela 24/7 ligado. Ela está sendo hosteada em um serviço gratuito enquanto não há necessidade nem retorno financeiro para adquirir um upgrade.")
            .addField("Variações",($ping.join(" / ")))
            .setFooter('<> = argumentos obrigatórios // () = argumentos opcionais')
            message.channel.send(help_ping)
        } else if($chord.indexOf(comando) !== -1) {
            let help_chord = new Discord.MessageEmbed()
            .setColor(constants.embedcolor)
            .setAuthor("Detalhes do comando")
            .setTitle(":information_source: $chord <nome do acorde>")
            .setDescription("Representa o acorde introduzido, em MIDI.")
            .addField("Variações",($chord.join(" / ")))
            .addField("$chord Emaj9", "= E MAJOR NINTH (imagem)",true)
            .addField("$chord G7 ", "= G DOMINANT SEVENTH (imagem)",true)
            .setFooter('<> = argumentos obrigatórios // () = argumentos opcionais')
            message.channel.send(help_chord)
        } else if($difference.indexOf(comando) !== -1) {
            let help_difference = new Discord.MessageEmbed()
            .setColor(constants.embedcolor)
            .setAuthor("Detalhes do comando")
            .setTitle(":information_source: $difference <insira uma nota> <insira outra nota>")
            .setDescription("Calcula a distância mais próxima entre duas notas, em semitons e cents.")
            .addField("Variações",($difference.join(" / ")))
            .addField("$difference G A", "= 2 semitons",true)
            .addField("$difference B E ", "= 5 semitons",true)
            .setFooter('<> = argumentos obrigatórios // () = argumentos opcionais')
            message.channel.send(help_difference)
        } else if($random.indexOf(comando) !== -1) {
            let help_random = new Discord.MessageEmbed()
            .setColor(constants.embedcolor)
            .setAuthor("Detalhes do comando")
            .setTitle(":information_source: $random (key/bpm)")
            .setDescription("Randomiza um BPM ou/e uma escala.")
            .addField("Variações",($random.join(" / ")))
            .addField("$random", "= 169 BPM, G# Pentatonic",true)
            .addField("$random key", "= A Major",true)
            .setFooter('<> = argumentos obrigatórios // () = argumentos opcionais')
            message.channel.send(help_random)
        } else if($camelot.indexOf(comando) !== -1) {
            let help_camelot = new Discord.MessageEmbed()
            .setColor(constants.embedcolor)
            .setAuthor("Detalhes do comando")
            .setTitle(":information_source: $camelot <nota> (major/minor)")
            .setDescription("Calcula as notas/escalas perfeitas de uma nota ou/e escala.")
            .addField("Variações",($camelot.join(" / ")))
            .addField("$camelot E", "= A, B",true)
            .addField("$camelot A minor", "= E Minor, D Minor",true)
            .setFooter('<> = argumentos obrigatórios // () = argumentos opcionais')
            message.channel.send(help_camelot)
        } else if($scale.indexOf(comando) !== -1) {
            let help_scale = new Discord.MessageEmbed()
            .setColor(constants.embedcolor)
            .setAuthor("Detalhes do comando")
            .setTitle(":information_source: $scale <nota> <escala>")
            .setDescription("Representa a escala introduzida, em MIDI.")
            .addField("Variações",($scale.join(" / ")))
            .addField("$scale C arabic", "= C, C#, E, F, G, G#, B, C",true)
            .addField("$scale A enigmatic", "= A, A#, C#, D#, F, G, G#, A#",true)
            .addField("Escalas disponíveis", scales.join(", "))
            .setFooter('<> = argumentos obrigatórios // () = argumentos opcionais')
            message.channel.send(help_scale)
        } else if($invite.indexOf(comando) !== -1) {
            let help_invite = new Discord.MessageEmbed()
            .setColor(constants.embedcolor)
            .setAuthor("Detalhes do comando")
            .setTitle(":information_source: $invite")
            .setDescription("Envia o link no qual pode ser usado para adicionar este BOT a outros servidores.")
            .addField("Variações",($invite.join(" / ")))
            .setFooter('<> = argumentos obrigatórios // () = argumentos opcionais')
            message.channel.send(help_invite)
        } else if($changelog.indexOf(comando) !== -1) {
            let help_changelog = new Discord.MessageEmbed()
            .setColor(constants.embedcolor)
            .setAuthor("Detalhes do comando")
            .setTitle(":information_source: $changelog")
            .setDescription("Mostra as novidades da última versão da Julia.")
            .addField("Variações",($changelog.join(" / ")))
            .setFooter('<> = argumentos obrigatórios // () = argumentos opcionais')
            message.channel.send(help_changelog)
        } else if($bpm.indexOf(comando) !== -1) {
            let help_bpm = new Discord.MessageEmbed()
            .setColor(constants.embedcolor)
            .setAuthor("Detalhes do comando")
            .setTitle(":information_source: $bpm <triplet/sec> <get/convert> <insira um bpm>")
            .setDescription("Calcula e converte variações de BPM.")
            .addField("Variações",($bpm.join(" / ")))
            .addField("$bpm triplet get 140", "= 105 BPM",true)
            .addField("$bpm sec convert 400", "= 150 BPM~",true)
            .setFooter('<> = argumentos obrigatórios // () = argumentos opcionais')
            message.channel.send(help_bpm)
        } else if($calculate.indexOf(comando) !== -1) {
            let help_calculate = new Discord.MessageEmbed()
            .setColor(constants.embedcolor)
            .setAuthor("Detalhes do comando")
            .setTitle(":information_source: $calculate (simple) <insira uma expressão>")
            .setDescription("Calcula/simplifica uma expressão matemática.")
            .addField("Variações",($calculate.join(" / ")))
            .addField("$calculate 4+4", "= 8",true)
            .addField("$calculate (2^4)-(8*2)", "= 0",true)
            .addField("$calculate simple x+x+x+y", "= 3*x+1",true)
            .addField("$calculate simple 3+2/4", "= 7/2",true)
            .setFooter('<> = argumentos obrigatórios // () = argumentos opcionais')
            message.channel.send(help_calculate)
        } else if($fibonacci.indexOf(comando) !== -1) {
            let help_fibonacci = new Discord.MessageEmbed()
            .setColor(constants.embedcolor)
            .setAuthor("Detalhes do comando")
            .setTitle(":information_source: $fibonacci")
            .setDescription("Calcula 48 números da sequência de Fibonacci.")
            .addField("Variações",($fibonacci.join(" / ")))
            .addField("$fibonacci", "= 1 | 2 | 3 | 5 | 8 | 13 | 21 ...",true)
            .setFooter('<> = argumentos obrigatórios // () = argumentos opcionais')
            message.channel.send(help_fibonacci)
        } else if($frequency.indexOf(comando) !== -1) {
            let help_frequency = new Discord.MessageEmbed()
            .setColor(constants.embedcolor)
            .setAuthor("Detalhes do comando")
            .setTitle(":information_source: $frequency <insira uma nota> (insira a frequência de A4)* (ext)**")
            .setDescription("Calcula a frequência exata de uma nota.")
            .addField("*", "Caso não for especificado uma frequência, A4 será 440 Hz.",true)
            .addField("**", "Acrescentar 'ext' no final mostra todos os decimais da frequência.",true)
            .addField("Variações",($frequency.join(" / ")))
            .addField("$frequency A4", "= 440 Hz",true)
            .addField("$frequency A4 432", "= 432 Hz",true)
            .addField("$frequency D6 ext", "= 1174.659071669631 Hz",true)
            .addField("$frequency E5 446", "= 668.244 Hz",true)
            .setFooter('<> = argumentos obrigatórios // () = argumentos opcionais')
            message.channel.send(help_frequency)
        }
        else {
            message.channel.send(_help)
        }
        
    }
}
);
client.login(config.token)