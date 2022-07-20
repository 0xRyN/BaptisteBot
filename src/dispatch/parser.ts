import { Message } from "discord.js";
import { CommandArgs } from "./types";

export default function parse(msg: Message): CommandArgs {
    let args = msg.content.toLowerCase().split(" ");
    let command = args[0].substring(1);
    args.shift();
    return {
        command,
        args,
    };
}
