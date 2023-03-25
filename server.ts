import Discord, { GatewayIntentBits, InternalDiscordGatewayAdapterCreator, Message } from 'discord.js';
import { botCred } from './config';
import { DisTube } from 'distube';

import { YtDlpPlugin } from '@distube/yt-dlp';
import SpotifyPlugin from '@distube/spotify';





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

client.on('messageCreate', (message: Message) => {
    if (!message.content.startsWith(botCred.prefix)) return;
    if (!message.member) {
        message.channel.send('Not a part of the server')
    }
    if (message.author.bot) {
        return;
    }
    let commandMessage =message;
    const voiceChannel = message.member?.voice.channel as Discord.VoiceBasedChannel;
    const args = message.content.slice(botCred.prefix.length).trim().split(/ +/g);
    const command = args.shift();
    if (command == "play")
        distube.play(voiceChannel, args.join(""), {
            member: message.member as Discord.GuildMember,
            textChannel: message.channel as Discord.GuildTextBasedChannel,
            message
        });
})

// client.on('messageCreate', (message: Message) => {
//     if (!message.member) {
//         message.channel.send('Not a part of the server')
//     }
//     if(message.author.bot){
//         return;
//     }

//     commandMessage = message;

//     const voiceChanneldId = message.member?.voice.channelId
//     const guildId = message.member?.guild.id
//     const adapterCreator = message.member?.voice.channel?.guild.voiceAdapterCreator as InternalDiscordGatewayAdapterCreator;
//     const command = utilities.getCommands(message);
//     const args = utilities.getArguments(message);
//     let commandToBeChecked = command;
//     if(guildId == undefined){
//         message.channel.send('Error Occured');
//         message.author.send('Error Occured');
//     }else if (voiceChanneldId == null || voiceChanneldId == undefined) {
//         message.channel.send('Join a Voice Channel');
//     } else {
//         switch (commandToBeChecked) {
//             case `${botCred.prefix}play`:

//                 if (!getVoiceConnections().size) {
//                     musicFunctionWrapper.playWhenBotHasNoConnections(message, voiceChanneldId, guildId, audioPlayer, adapterCreator, displayQueue, args);
//                 } else {
//                     musicFunctionWrapper.playWhenBotHasVoiceConnections(message, utilities, audioPlayer, displayQueue, playerQueue, args);
//                 }
//                 break;
//             case `${botCred.prefix}skip`:
//                 const newArgs = playerQueue.shift();
//                 if (newArgs == undefined) {
//                     console.log('empty queue')
//                 } else {
//                     musicFunctionWrapper.playWhenGivenSkip(newArgs, commandMessage, audioPlayer)
//                 }
//                 break;
//             case `${botCred.prefix}queue`:
//                 for (let i = 1; i <= displayQueue.length; i++) {
//                     message.channel.send(`${i}. ${displayQueue[i]}`);
//                 }
//                 break;
//             case `${botCred.prefix}leave`:
//                 const voiceConnection = Array.from(getVoiceConnections())[0];
//                 musicFunctions.leaveChannel(voiceConnection[1]);
//                 break;
//             case `${botCred.prefix}stop`:
//                 musicFunctions.stopMusic(audioPlayer);
//                 break;
//             case `${botCred.prefix}kill`:
//                 const voiceChannelConnection = Array.from(getVoiceConnections())[0];
//                 musicFunctions.leaveChannel(voiceChannelConnection[1]);
//                 console.log('Killing the Bot....');
//                 process.exit(0);

//             default :
//                 return
//         }

//     }

// });

// audioPlayer.on('stateChange', (oldState, newState) => {
//     if (oldState.status == AudioPlayerStatus.Playing && newState.status == AudioPlayerStatus.Idle) {
//         console.log('stateChanged');
//         const newArgs = playerQueue.shift();
//         if (newArgs == undefined) {
//             console.log('empty queue', playerQueue)
//         } else {
//             const voiceConnection = Array.from(getVoiceConnections())[0];
//             yts(newArgs).then((searchResult) => {
//                 const embed = musicFunctions.youtubePlay(voiceConnection[1], searchResult, audioPlayer);
//                 commandMessage.channel.send({ embeds: [embed] });
//             })
//         }
//     }
// });

client.login(botCred.token);