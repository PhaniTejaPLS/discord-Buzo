import { Message } from "discord.js";
import DisTube from "distube";

export class StopMusic {
    stopMusic(message: Message, distube: DisTube) {
        distube.stop(message);
        message.channel.send("Stopped the queue!");

    }
}