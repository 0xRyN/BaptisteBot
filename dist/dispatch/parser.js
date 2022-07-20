"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parse(msg) {
    let args = msg.content.toLowerCase().split(" ");
    let command = args[0].substring(1);
    args.shift();
    return {
        command,
        args,
    };
}
exports.default = parse;
