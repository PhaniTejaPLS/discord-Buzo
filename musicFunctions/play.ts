import Discord, { Message } from 'discord.js'
import { DisTube, SearchResultVideo } from 'distube';

export class PlayMusic {
    playMusic(distube: DisTube,voiceChannel:Discord.VoiceBasedChannel,message:Message, searchResult: SearchResultVideo[]){
        distube.play(voiceChannel,searchResult[0].url, {
            member: message.member as Discord.GuildMember,
            textChannel: message.channel as Discord.GuildTextBasedChannel,
            message
    });
    }

    skipMusic(distube: DisTube, message: Message){
        distube.skip(message.guild  as Discord.Guild);
    }
}