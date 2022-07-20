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
const videos_json_1 = __importDefault(require("./static/videos.json"));
function getRandomVideo() {
    let randomVideo = videos_json_1.default[Math.floor(Math.random() * videos_json_1.default.length)];
    return randomVideo;
}
function shouldReply(str) {
    return /\w*[Qq][Uu][Oo][Ii][^A-Za-z0-9]*$/.test(str);
}
function feur(msg, args) {
    return __awaiter(this, void 0, void 0, function* () {
        let content = args[0];
        if (!shouldReply(content))
            return false;
        let video = getRandomVideo();
        yield msg.channel.send(video);
        return true;
    });
}
exports.default = feur;
