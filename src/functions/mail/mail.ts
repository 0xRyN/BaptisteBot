import MAILS_LIST from "./static/mails.json";
import { Message } from "discord.js";

interface MailsList {
    [key: string]: string;
}

export default async function getMail(
    msg: Message,
    args: string[]
): Promise<boolean> {
    let teacher = args[0];
    let mails = <MailsList>MAILS_LIST;
    for (let fullName in mails) {
        let arr = fullName.split(" ");
        let fName = arr[0].toLowerCase();
        let lName = arr[1].toLowerCase();
        if (fName === teacher || lName === teacher) {
            await msg.reply(mails[fullName]);
            return true;
        }
    }
    await msg.reply("Je connais beaucoup de choses... Mais pas ce prof.");
    return false;
}
