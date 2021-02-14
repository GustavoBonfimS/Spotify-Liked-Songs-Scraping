import dotenv from 'dotenv';

dotenv.config();

const Discord = require('discord.js');

const client = new Discord.Client({
  presence: {
    activity: {
      name: '$help',
      type: 'PLAYING',
    },
  },
});

client.on('ready', () => {
  console.log('Bot online ✨');
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'geral');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Bem vindo a nossa bagunça, ${member} !`);
});

// client.on('message', msg => {
//   if (msg.content === 'oi bot') {
//     msg.react('❤');
//     msg.channel.send('Olá!');
//   }

//   if (msg.content === `${BOT_PREFIX}github`) {
//     msg.channel.send('link: https://github.com/GustavoBonfimS/discord-bot');
//   }

//   if (msg.content === `${BOT_PREFIX}help`) {
//     msg.channel.send('$github -> link do repositório \nContruibua!');
//   }
// });

client.login(process.env.BOT_TOKEN);

export default client;
