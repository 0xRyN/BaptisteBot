import { Message } from "discord.js";
import { CommandArgs } from "./types";
import parse from "./parser";
import replyError from "../functions/error/error";
import getMail from "../functions/mail/mail";
import replyFeur from "../functions/feur/feur";

let INTERACT_FUNCTIONS = [replyFeur]; // Add non-command functions here

/**
 * This is used for functions that directly interact with any message.
 * They do not require a command (!command args) to be used.
 * They analyze every message and reply accordingly.
 * @param msg The message to analyze.
 * @returns Boolean indicating if the message was handled.
 */

function interact(msg: Message) {
    for (let func of INTERACT_FUNCTIONS) {
        let content = msg.content.toLowerCase();
        func(msg, [content]);
    }
}

function getCommand(command: string): Function {
    switch (command) {
        case "mail":
            return getMail;
        // TODO: Add more commands here
        default:
            return replyError;
    }
}

export default async function dispatch(msg: Message): Promise<boolean> {
    interact(msg); // Handle non command functions.

    if (!msg.content.startsWith("!")) return false;

    let { command, args } = parse(msg);

    let func = getCommand(command);

    let functionSuccess = await func(msg, args);

    return functionSuccess;
}
