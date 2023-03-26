import Discord, { GatewayIntentBits, InternalDiscordGatewayAdapterCreator, Message } from 'discord.js';
import { botCred } from './config';
import { DisTube, SearchResultVideo } from 'distube';

import { YtDlpPlugin } from '@distube/yt-dlp';
import SpotifyPlugin from '@distube/spotify';
import { SearchYoutube } from './musicFunctions/search';
import { PlayMusic } from './musicFunctions/play';
import { StopMusic } from './musicFunctions/stop';
import { PauseMusic } from './musicFunctions/pause';


const searchModule = new SearchYoutube();
const playModule = new PlayMusic();
const stopModule = new StopMusic();
const pauseMusic = new PauseMusic();


const client = new Discord.Client({
    intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,]
});

const distube = new DisTube(client, {
    plugins: [new SpotifyPlugin({
        emitEventsAfterFetching: true
      }),
      new YtDlpPlugin()],
    emitNewSongOnly: false,
    joinNewVoiceChannel: true,

});




client.on('ready', () => {
    console.log("Ready!!");
});


client.on('messageCreate', (message: Message) => {
    if (message.content == 'ping')
        message.channel.send('Pong!!');
});

client.on('messageCreate', async (message: Message) => {
    if (!message.content.startsWith(botCred.prefix)) return;
    if (!message.member) {
        message.channel.send('Not a part of the server')
    }
    if (message.author.bot) {
        return;
    }
    let commandMessage =message;
    console.log(commandMessage);
    const voiceChannel = message.member?.voice.channel as Discord.VoiceBasedChannel;
    const args = message.content.slice(botCred.prefix.length).trim().split(/ +/g);
    const command = args.shift();
    console.log(command)
    if (command == "play"){
        const searchResult: SearchResultVideo[] = await searchModule.searchYoutube(distube,args);
        // console.log(searchResult);
           playModule.playMusic(distube,voiceChannel,message,searchResult);
    }
    else if(command == "stop"){ 
        stopModule.stopMusic(message,distube)
    }
    else if(command == "pause"){
        pauseMusic.pauseMusic(distube,message);
    }else if (command == "resume"){
        pauseMusic.resumeMusic(distube, message);
    }
    else if (command == "skip"){
        playModule.skipMusic(distube,message);
    }
   
});



client.login(botCred.token);