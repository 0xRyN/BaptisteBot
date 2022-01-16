const { links, mails, whitelist } = require("./consts");

// TODO : SEPARATE EACH FUNCTION IN ITS OWN FILE

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
    if (!s.toLowerCase().includes("!mail")) return;
    let words = s.split(" ");
    let word = words[1].toLowerCase();
    let keys = Object.keys(mails);
    let res = keys.filter((key) => {
        let name = key.split(" ");
        let fName = name[0].toLowerCase();
        let lName = name[1].toLowerCase();
        return fName === word || lName === word;
    });
    if (res.length > 0) {
        let prof = res[0];
        msg.reply(mails[prof]);
    } else {
        msg.reply("Prof not found. 404. Merde !");
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
