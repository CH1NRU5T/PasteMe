const Discord = require(`discord.js`);
// var hastebin = require('hastebin')
const client = new Discord.Client();
const axios = require('axios')
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
  else if(command==`pastefile`){
    const file = msg.attachments.first();
    const fileUrl=(file.url)
    var fileContent = getFileContent(fileUrl).then(content=>pasteToPastebinAndReturnLink(msg,content)).catch(err=>console.log(err))
    // pasteToPastebinAndReturnLink(msg,this.getFileContent(fileUrl).then(content=>console.log(content)).catch(err=>console.log(err)))
    
  }
});

var getFileContent= (fileUrl) =>{
  return axios.get(fileUrl).then(fileContent => fileContent.data)
  .catch(err=>console.log(err));
}

function pasteToPastebinAndReturnLink(msg,text){
// hastebin.createPaste(text,{
//   raw:false,
//   contentType:'text/plain',
//   server:'https://hastebin.com'
// }, /*options for the got module here*/{})
//     .then((url)=>{
//       msg.reply(url)
//     }).catch((err)=>
//     msg.reply(err))
// }
return axios.post('https://hastebin.com/documents', text).then(key=> msg.reply('https://hastebin.com/'+key.data.key))
.catch(err=>console.log(err))
}
keepAlive()
client.login(process.env.TOKEN);