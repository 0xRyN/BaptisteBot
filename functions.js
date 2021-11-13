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

exports.react = react;
exports.mechant = mechant;
exports.feur = feur;
