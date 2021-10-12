const Discord = require(`discord.js`);
const client = new Discord.Client();
const axios = require('axios')
const keepAlive = require('./server')
require('dotenv').config();

const prefix = "."

const fs = require('fs')

//Create a new Discord collection
client.commands = new Discord.Collection();


//readdirSync -> reads the contents of the directory
//make sure that the command files are javascript files
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith(`.js`));

//traverse throught all the command files
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on(`ready`, () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

//actions on message
client.on(`message`, async msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  //if .paste is entered, take the string after that and create a paste with the string
  if (command === `paste`) {
    let commandArg = msg.content.slice(prefix.length + command.length + 1);
    client.commands.get(`paste`).execute(msg, args, commandArg);
  }

  //if .pastefile is entered, read the contents of the file and then create a paste with it
  else if (command == `pastefile`) {
    msg, args, client.commands.get(`pastefile`).execute(msg, args).then(content => client.commands.get(`paste`).execute(msg, args, content));
  }
});

keepAlive()
client.login(process.env.TOKEN);