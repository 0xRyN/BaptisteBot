require("dotenv").config();
const { feur, aurelie, mechant } = require("./functions");
const { Client, Intents } = require("discord.js");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});

const API_KEY = process.env.API_KEY;

client.on("ready", () => {
    console.log("C'est prêt !");
});

client.on("messageCreate", (msg) => {
    // Check if message hasn't been sent by bot itself

    if (msg.author.id === client.application.id) return;

    if (msg.content.toLowerCase().includes("gros")) {
        msg.reply("Ouais gros ?");
    }

    if (msg.content.toLowerCase().includes("baptiste")) {
        msg.reply("T'a pas un 10 balles gros ?");
    }

    if (msg.content.toLowerCase().includes("olivier")) {
        msg.reply("Mon anaconda est en train de se révéiller !");
    }

    if (msg.content.toLowerCase().includes("dany")) {
        msg.reply("Gros feeling mec !");
    }

    if (msg.content.toLowerCase().includes("rayan")) {
        msg.reply("Lequel ?");
    }

    if (msg.content.toLowerCase().includes("getir")) {
        msg.reply("Ntm t'auras pas la tech");
    }

    if (msg.content.toLowerCase().includes("ping")) {
        msg.reply("pong !");
    }

    if (msg.content.toLowerCase().includes("reveille")) {
        msg.reply("Oui chef !");
    }

    mechant(msg);
    aurelie(msg);
    feur(msg);
});

client.login(API_KEY);
