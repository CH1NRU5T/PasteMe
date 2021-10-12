const axios = require("axios");
module.exports = {
    name: `pastefile`,
    description: `Command to read data from a file and create a paste out of it`,
    execute(message, args) {

        const file = message.attachments.first();
        const fileUrl = (file.url)

        var getFileContent = (fileUrl) => {
            return axios.get(fileUrl).then(fileContent => fileContent.data)
                .catch(err => console.log(err));
        }

        return getFileContent(fileUrl)
    }
}