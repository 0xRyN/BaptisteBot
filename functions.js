const feur = (msg) => {
    const links = [
        "https://cdn.discordapp.com/attachments/730773665066516490/919994972470652978/feur.mp4",
        "https://cdn.discordapp.com/attachments/730773665066516490/919994147241353246/feur.mp4",
        "https://cdn.discordapp.com/attachments/730773665066516490/919995774014722078/video0.mov",
        "https://cdn.discordapp.com/attachments/753279793461592174/919996299883970590/yt1s.com_-_FEUR_masterclass_ici_cest_Pessi_.mp4",
        "https://cdn.discordapp.com/attachments/730773665066516490/919997763524124742/VIDEO_FEUR.mp4",
    ];
    let s = msg.content;
    let len = s.length;
    let link = links[Math.floor(Math.random() * links.length)];
    if (
        s.substring(len - 4, len).toLowerCase() === "quoi" ||
        s.substring(len - 6, len).toLowerCase() === "quoi ?" ||
        s.substring(len - 5, len).toLowerCase() === "quoi?"
    ) {
        msg.reply(link);
    }
};

const mechant = (msg) => {
    let rand = Math.random();
    if (rand < 0.0005) {
        msg.reply("ouais mais raconte pas ta vie");
    }
};

const react = (msg) => {
    let s = msg.content;
    if (s.toLowerCase().includes("haha")) {
        msg.react("😹");
    }
};

const repete = (msg) => {
    let s = msg.content;
    if (s.toLowerCase().includes("repete")) {
        const words = s.split(" ");
        let repete_word = words[0];
        for (let i = 0; i < words.length; i++) {
            if (words[i] == "repete") {
                if (i + 1 < words.length) {
                    repete_word = words[i + 1].toLowerCase();
                } else {
                    repete_word = "non";
                }
            }
        }
        msg.reply(repete_word);

        /*TODO PLUS TARD faire en emoji;
        for(let i = 0; i < repete_word.length; i++){
            console.log("\:regional_indicator_"+ repete_word.charAt(i)+":");

            if(repete_word.charAt(i) >= 97 ||  repete_word.charAt(i) <= 122){
                msg.react("❔");
            }else{
        //        msg.guild.emojis.cache.find(emoji => emoji.name === ("regional_indicator_" + charAt(i))).then((reactionEmoji) => {msg.react(reactionEmoji)});
            ///    console.log(reactionEmoji);
               msg.react( msg.guild.emojis.cache.find(emoji => emoji.name === ("regional_indicator_" + charAt(i))).then((reactionEmoji) => {msg.react(reactionEmoji)}));
            }
    }*/
    }
};

const pfc = (msg) => {
    let s = msg.content;
    if (
        s.toLowerCase().includes("✂️") ||
        s.toLowerCase().includes("📄") ||
        s.toLowerCase().includes("🪨")
    ) {
        msg.reply(jeu_pfc(s));
    }
};

function jeu_pfc(x) {
    var random = getRandomInt(3);
    var choix;
    var reponse;
    switch (random) {
        case 0:
            choix = "✂️";
            break;
        case 1:
            choix = "📄";
            break;
        default:
            choix = "🪨";
            break;
    }
    if (
        (x == "🪨" && choix == "🪨") ||
        (x == "✂️" && choix == "✂️") ||
        (x == "🪨" && choix == "🪨")
    ) {
        reponse = "je choisi : " + choix + " | Go relancer bg";
    } else if (
        (x == "✂️" && choix == "🪨") ||
        (x == "📄" && choix == "✂️") ||
        (x == "🪨" && choix == "📄")
    ) {
        reponse = "je choisi : " + choix + " | Ez ptdrr t'es trop nul, gg ";
    } else {
        reponse = "je choisi : " + choix + " | Que de la luck, mais gg";
    }
    return reponse;
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

exports.pfc = pfc;
exports.react = react;
exports.mechant = mechant;
exports.feur = feur;
exports.repete = repete;
