import { Message } from "discord.js";
import ALL_VIDEOS from "./static/videos.json";

function getRandomVideo(): string {
    let randomVideo = ALL_VIDEOS[Math.floor(Math.random() * ALL_VIDEOS.length)];
    return randomVideo;
}

function shouldReply(str: string): boolean {
    return /\w*[Qq][Uu][Oo][Ii][^A-Za-z0-9]*$/.test(str);
}

export default async function feur(
    msg: Message,
    args: string[]
): Promise<boolean> {
    let content = args[0];
    if (!shouldReply(content)) return false;
    let video = getRandomVideo();
    await msg.channel.send(video);
    return true;
}
