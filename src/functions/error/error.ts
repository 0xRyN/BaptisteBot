import { Message } from "discord.js";

export default async function error(
    msg: Message,
    args: string[]
): Promise<boolean> {
    await msg.reply("Commande introuvable...");
    return true;
}
