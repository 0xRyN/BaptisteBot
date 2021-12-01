const feur = (msg) => {
    let s = msg.content;
    let len = s.length;
    if (
        s.substring(len - 4, len).toLowerCase() === "quoi" ||
        s.substring(len - 6, len).toLowerCase() === "quoi ?" ||
        s.substring(len - 5, len).toLowerCase() === "quoi?"
    ) {
        msg.reply(
            "https://cdn.discordapp.com/attachments/730773665066516490/905573160508854303/video0.mov"
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
        const words = s.split(' ');
        let repete_word = words[0];
        for(let i = 0; i < words.length; i++){
            if(words[i] == "repete"){
                if((i+1) < words.length){
                    repete_word = words[i+1].toLowerCase();
                }else{
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

exports.react = react;
exports.mechant = mechant;
exports.feur = feur;
exports.repete = repete;
