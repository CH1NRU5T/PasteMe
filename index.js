const Discord = require(`discord.js`);
var hastebin = require('hastebin')
const client = new Discord.Client();
const keepAlive = require('./server')

const prefix = "."

client.on(`ready`, ()=>{
  console.log(`Logged in as ${client.user.tag}!`)
});

//actions on message
client.on(`message`, async msg=>{
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if(command === `paste`){
    pasteToPastebinAndReturnLink(msg, msg.content.slice(prefix.length + command.length+1));
    // console.log(msg.content.slice(prefix.length + command.length+1))
  }
});



function pasteToPastebinAndReturnLink(msg,text){
hastebin.createPaste(text,{
  raw:false,
  contentType:'text/plain',
  server:'https://hastebin.com'
}, /*options for the got module here*/{})
    .then((url)=>{
      msg.reply(url)
    }).catch((err)=>
    msg.reply(err))
}

keepAlive()
client.login(process.env.TOKEN);