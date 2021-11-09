require("dotenv").config();
const { feur, mechant, react } = require("./functions");
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
    
    if (msg.content.toLowerCase().includes("di")) {
		if(msg.content.length > 10){
			const message = "";
			const str[] = msg.content.split(" ").includes;
			for (let i = 0; i < str.length ; i++) {
				if(str[i].includes("di")){
					message = str[i].substring(2);
				}
			}
			msg.reply(message);
		}
    }    
    react(msg);
    mechant(msg);
    feur(msg);
});

client.login(API_KEY);
