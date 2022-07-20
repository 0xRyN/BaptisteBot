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
const parser_1 = __importDefault(require("./parser"));
const error_1 = __importDefault(require("../functions/error/error"));
const mail_1 = __importDefault(require("../functions/mail/mail"));
const feur_1 = __importDefault(require("../functions/feur/feur"));
let INTERACT_FUNCTIONS = [feur_1.default]; // Add non-command functions here
/**
 * This is used for functions that directly interact with any message.
 * They do not require a command (!command args) to be used.
 * They analyze every message and reply accordingly.
 * @param msg The message to analyze.
 * @returns Boolean indicating if the message was handled.
 */
function interact(msg) {
    for (let func of INTERACT_FUNCTIONS) {
        let content = msg.content.toLowerCase();
        func(msg, [content]);
    }
}
function getCommand(command) {
    switch (command) {
        case "mail":
            return mail_1.default;
        // TODO: Add more commands here
        default:
            return error_1.default;
    }
}
function dispatch(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        interact(msg); // Handle non command functions.
        if (!msg.content.startsWith("!"))
            return false;
        let { command, args } = (0, parser_1.default)(msg);
        let func = getCommand(command);
        let functionSuccess = yield func(msg, args);
        return functionSuccess;
    });
}
exports.default = dispatch;
