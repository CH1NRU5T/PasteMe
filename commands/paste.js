const axios = require('axios')
module.exports =
{
    name: `paste`,
    description: `This is the paste command`,
    execute(message, args, argsContent) {

        pasteToHastebinAndReturnLink(message, argsContent);
        function pasteToHastebinAndReturnLink(msg, text) {
            return axios.post('https://hastebin.com/documents/', text).then(key => msg.reply('https://hastebin.com/raw/' + key.data.key))
                .catch(err => console.log(err))
        }

    }
}