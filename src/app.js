require("dotenv").config();
const {
    feur,
    mechant,
    react,
    repete,
    pfc,
    profmail,
    getWhitelisted,
} = require("./functions");
const { Quiz } = require("./quiz/quiz.js");

const { roulette, leaderboard } = require("./russian-roulette");

const { Client, Intents } = require("discord.js");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});

const API_KEY = process.env.API_KEY; //The API KEY provided in the .env file
let quiz;

client.on("ready", () => {
    console.log("C'est prêt !");
    quiz = Quiz.getInstance()
        .register()
        .minTime(10 * 60) // 10 minutes
        .maxTime(24 * 60 * 60) // 24 hours;
});

client.on("messageCreate", (msg) => {
    // Check if message hasn't been sent by bot itself

    if (msg.author.id === client.application.id) return;

    if (msg.content.toLowerCase().includes("ping")) {
        msg.reply("pong !");
    }
    
    if (msg.content.startsWith("!quiz"))
        quiz.action(msg);
    

    react(msg);
    mechant(msg);
    feur(msg);
    repete(msg);
    pfc(msg);
    profmail(msg);
    getWhitelisted(msg);
    roulette(msg);
    leaderboard(msg, client);
});

client.login(API_KEY);
