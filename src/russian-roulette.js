const fs = require("fs");
const statsFileName = __dirname + "/static/roulette-stats.json";
const stats = require(statsFileName);

const getStats = (userId) => {
    return stats[userId];
};

const updateStats = async (userId, hasWon) => {
    let updatedScore = stats[userId];
    if (updatedScore == null) {
        updatedScore = 0;
    }
    if (hasWon) {
        updatedScore += 1;
    } else {
        updatedScore = 0;
    }
    stats[userId] = updatedScore;
    fs.writeFile(statsFileName, JSON.stringify(stats), function writeJSON(err) {
        if (err) return console.log(err);
    });
};

const draw = () => {
    let r = Math.random();
    return r > 0.95;
};

function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const kick = async (user) => {
    await timeout(3000);
    user.kick("Tu as perdu la roulette... Triste");
};

const leaderboard = async (msg, client) => {
    let s = msg.content;
    if (!s.toLowerCase().includes("!leaderboard")) {
        return;
    }
    let res = "Voici le top 10 des plus chanceux de la roulette : \n";

    let sortableArray = [];

    for (let v in stats) {
        sortableArray.push([v, stats[v]]);
    }

    sortableArray.sort((a, b) => b[1] - a[1]);

    let maxLeaderboard = sortableArray.length > 10 ? 10 : sortableArray.length;

    for (let i = 0; i < maxLeaderboard; i++) {
        let userId = sortableArray[i][0];
        console.log(userId);
        let user = await client.users.fetch(userId);
        let username = user.username;
        let score = sortableArray[i][1];
        let emoji = "";

        switch (i) {
            case 0:
                emoji = ":first_place:";
                break;
            case 1:
                emoji = ":second_place:";
                break;
            case 2:
                emoji = ":third_place:";
                break;
            default:
                emoji = ":medal:";
                break;
        }

        res += `\n${emoji} ${username} avec ${score} !`;
    }
    msg.channel.send(res);
};

const roulette = async (msg) => {
    let s = msg.content;
    if (!s.toLowerCase().includes("!roulette")) {
        return;
    }
    let userId = msg.author.id;
    if (draw()) {
        let userToKick = msg.member;
        msg.reply(
            "Tu as perdu la roulette, tu vas être kick dans 3 secondes..."
        );
        updateStats(userId, false);
        try {
            kick(userToKick);
        } catch (e) {
            msg.reply("Impossible de le kick. Il serait donc un dieu ?");
        }
    } else {
        await updateStats(userId, true);
        let score = getStats(userId);
        msg.reply(
            `Tu as gagné la roulette ! Ton score est de ${score} mais gare à la suite...`
        );
    }
};

exports.roulette = roulette;
exports.leaderboard = leaderboard;
