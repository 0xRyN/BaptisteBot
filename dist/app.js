"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const dispatcher_1 = __importDefault(require("./dispatch/dispatcher"));
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
        discord_js_1.GatewayIntentBits.MessageContent,
    ],
});
dotenv_1.default.config();
const API_KEY = process.env.API_KEY; //The API KEY provided in the .env file
const GENERAL_CHANNEL_ID = "753279793461592174";
function handshake(client) {
    return __awaiter(this, void 0, void 0, function* () {
        // Send message to the general channel
        let channel = yield client.channels.fetch(GENERAL_CHANNEL_ID);
        channel.send("Ah... J'ai bien dormi.\nBonjour à tous !");
    });
}
client.on("ready", () => {
    console.log("C'est prêt !");
    handshake(client);
});
client.on("messageCreate", (message) => {
    if (message.author.bot)
        return;
    (0, dispatcher_1.default)(message);
});
client.login(API_KEY);
