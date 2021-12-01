require("dotenv").config();
const { feur, mechant, react, repete} = require("./functions");
const { Client, Intents } = require("discord.js");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});

const API_KEY = process.env.API_KEY; //The API KEY provided in the .env file

client.on("ready", () => {
    console.log("C'est prêt !");
});

client.on("messageCreate", (msg) => {
    // Check if message hasn't been sent by bot itself

    if (msg.author.id === client.application.id) return;

    if (msg.content.toLowerCase().includes("ping")) {
        msg.reply("pong !");
    }

    react(msg);
    mechant(msg);
    feur(msg);
    repete(msg);

});

client.login(API_KEY);
