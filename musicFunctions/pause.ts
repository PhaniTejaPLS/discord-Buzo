import Discord,{ Message } from "discord.js";
import { DisTube } from "distube";

export class PauseMusic {
    pauseMusic(distube:DisTube,message: Message){
        distube.pause(message.guild as Discord.Guild);
    }
    resumeMusic(distube: DisTube, message: Message){
        distube.resume(message.guild as Discord.Guild)
    }
}