const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
		//test command
		if (command === 'args-info') {
			if (!args.length) {
				return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
			}
			else if (args[0] === 'foo') {
				return message.channel.send('bar');
			}
		}
		else if (command === 'kick') {
			// this is a sanity check so bot doesnt crash from a lack username
			if (!message.mentions.users.size);
				return message.reply (`you need to tag someone!`);
			// grab the "first" mentioned user from the message
			// this will return a `User` object, just like `message.author`
			const taggedUser = message.mentions.users.first();
		
			message.channel.send(`You wanted to kick: ${taggedUser.username}`);
		}
		else if (command === 'avatar') {
			if (!message.mentions.users.size) {
				return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
			}
			const avatarList = message.mentions.users.map(user => {
				return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
			});
		
			// send the entire array of strings as a message
			// by default, discord.js will `.join()` the array with `\n`
			message.channel.send(avatarList);
		}
	  	message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	}
);

client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);