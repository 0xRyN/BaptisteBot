import { Client, TextChannel, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import dispatch from "./dispatch/dispatcher";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
    ],
});

dotenv.config();
const API_KEY = process.env.API_KEY; //The API KEY provided in the .env file
const GENERAL_CHANNEL_ID = "753279793461592174";

async function handshake(client: Client) {
    // Send message to the general channel
    let channel = <TextChannel>await client.channels.fetch(GENERAL_CHANNEL_ID);
    channel.send("Ah... J'ai bien dormi.\nBonjour à tous !");
}

client.on("ready", () => {
    console.log("C'est prêt !");
    // handshake(client); If want to send a message on "up" state
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    dispatch(message);
});

client.login(API_KEY);
