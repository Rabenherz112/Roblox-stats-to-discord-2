const axios = require('axios');
const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    setInterval(async () => {
        const guild = client.guilds.cache.get(config.guild);
        
        // Get's the Channel as well as sends a request to Roblox to find all Infos about the Game
        const playerschannel = guild.channels.cache.get(config.voicechannels.RobloxActivePlaying);
        const playersrequest = await axios.get(config.urls.RobloxGameInfos);
        // Filter's the Data, to only see the active Player's playing
        const playersPlaying = playersrequest.data.data[0].playing;
        console.log(playersPlaying)


        // Get's the Channel as well as sends a request to Roblox to find all Infos about the Group
        const memberschannel = guild.channels.cache.get(config.voicechannels.RobloxGroupMemberCount);
        const membersrequest = await axios.get(config.urls.RobloxGroupInfos);
         // Filter's the Data, to only see the Group Member Count
        const membersCount = membersrequest.data.memberCount;
        console.log(membersCount)
        // Uses the saved Data and edits all Channels
        playerschannel.setName((playersPlaying > 0 ? 'ðŸŸ¢: ' : 'ðŸŸ¡: ') + playersPlaying + ' Players playing');
        memberschannel.setName('Total Members: ' + membersCount);

        const status = [
            `the Group and the Game` // You can add your own Status by adding values
        ];

        const index = Math.floor(Math.random() * status.length);

        client.user.setPresence({ activity: { name: status[index], type: 'WATCHING' } });
    }, 5 * 60 * 1000); // 1000 ms * 60 seconds * 5 minutes
});

client.login(config.token);
