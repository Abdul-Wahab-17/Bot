const path = require(`path`);
const getAllFiles = require("./getAllFiles");


module.exports = ()=>{

        let commands = [];
        const commandFolders = getAllFiles(path.join(__dirname , `..` , `commands`) , true);

        for (commandFolder of commandFolders){
            commandFiles = getAllFiles(commandFolder);
            for ( commandFile of commandFiles){
                let cmdObject = require(commandFile);
                commands.push(cmdObject);
            }

        }

        return commands;

}