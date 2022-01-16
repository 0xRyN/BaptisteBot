const links = [
    "https://cdn.discordapp.com/attachments/730773665066516490/919994972470652978/feur.mp4",
    "https://cdn.discordapp.com/attachments/730773665066516490/919994147241353246/feur.mp4",
    "https://cdn.discordapp.com/attachments/730773665066516490/919995774014722078/video0.mov",
    "https://cdn.discordapp.com/attachments/753279793461592174/919996299883970590/yt1s.com_-_FEUR_masterclass_ici_cest_Pessi_.mp4",
    "https://cdn.discordapp.com/attachments/730773665066516490/919997763524124742/VIDEO_FEUR.mp4",
];
const whitelist = [
    "401703748109467648",
    "363033061161435136",
    "623246465287847956",
    "122429924739907584",
    "693079612627877939",
];
// So far whitelisted members are (in order) :
/*
    Uly#4465
    Lyrelle#0512
    Hipp0x#0668
    PandorasRed#2564
    Laure#0308
*/

const mails = {
    "Abbes Samy": "samy.abbes@univ-paris-diderot.fr",
    "Balthazar Bauer": "Bauer.Balthazar@irif.fr",
    "Degorre Aldric": "Aldric.Degorre@irif.fr",
    "Geoffroy Guillaume": "Guillaume.Geoffroy@irif.fr",
    "Gonzalez Colin": "Colin.Gonzalez@irif.fr",
    "Jurski Yan": "jurski@irif.fr",
    "Laroussinie François": "François.Laroussinie@irif.fr",
    "Letouzey Pierre": "Pierre.Letouzey@irif.fr",
    "Mantaci Roberto": "Roberto.Mantaci@irif.fr",
    "Micheli Anne": "Anne.MICHELI@irif.fr",
    "Picantin Matthieu": "picantin@irif.fr",
    "Poulalhon Dominique": "Dominique.Poulalhon@irif.fr",
    "Rozière Paul": "Paul.Roziere@irif.fr",
    "Sangnier Arnaud": "Arnaud.Sangnier@irif.fr",
    "Sirangelo Cristina": "Cristina.Sirangelo@irif.fr",
    "Zielonka Wieslaw": "Wieslaw.Zielonka@irif.fr",
};

const feur = (msg) => {
    let s = msg.content;
    let link = links[Math.floor(Math.random() * links.length)];
    let senderID = msg.author.id; // Note : conversion might truncate the ID. Test this.
    if (
        /\\w*[Qq][Uu][Oo][Ii][^A-Za-z0-9]*/.test(s) // replaced old tests by a regex
    ) {
        if (!whitelist.includes(senderID)) {
            msg.reply(link);
        }
    }
};

const getWhitelisted = (msg) => {
    let s = msg.content;
    if (s.toLowerCase().includes("whitelist")) {
        whitelist.push(msg.author.id);
        let reponse = "";
        for (let i in whitelist) {
            reponse += i + "\n";
        }
        msg.reply(
            "Vous etes a présent whitelist. \nUID des personnes ignorées par le feur : " +
                reponse
        );
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

const profmail = (msg) => {
    let s = msg.content;
    let keys = Object.keys(mails);
    if (s.toLowerCase().includes("!mail")) {
        const words = s.split(" ");
        for (let word in words) {
            for (let key in keys) {
                if (key.includes(word.toLowerCase())) {
                    msg.reply(mails.key);
                    return;
                }
            }
        }
        msg.reply(
            "Désolé, je ne connais pas le mail de cette personne. Si c'est un oubli, faites un PR pour l'ajouter au code !"
        );
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
exports.profmail = profmail;
exports.getWhitelisted = getWhitelisted;
