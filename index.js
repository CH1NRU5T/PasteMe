const Discord = require(`discord.js`);
var rp = require('request-promise');
const client = new Discord.Client();
const axios = require('axios');
var textToPaste="";

const prefix = ":"
function createParams(text1){
const params = new URLSearchParams()
params.append('api_dev_key', process.env.KEY)
params.append('api_paste_code', text1)
params.append('api_option', 'paste')
return params;
}


client.on(`ready`, ()=>{
  console.log(`Logged in as ${client.user.tag}!`)
});

//actions on message
client.on(`message`, async msg=>{
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if(command === `ping`){
    pasteToPastebinAndReturnLink(msg, msg.content.slice(prefix.length + command.length+1));
    // console.log(msg.content.slice(prefix.length + command.length+1))
  }
});

function argsToText(args){
  var text2=""
  args.forEach(element=>{
    text2+=element;
  })
  return text2;
}

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

function pasteToPastebinAndReturnLink(msg,text){
axios.post('https://pastebin.com/api/api_post.php', createParams(text), config)
  .then((result) => {
    // console.log(result.data)
    // return result.data;
    msg.reply(result.data)
  })
  .catch((err) => {
    // console.log(err)
    // return err;
    msg.reply(err)
  })
}

client.login(process.env.TOKEN);