const {REST , Routes} = require(`discord.js`);
const fs = require(`node:fs`);
const path = require(`node:path`);
require('dotenv').config();

const token =  process.env.token;
const guildID = process.env.guildId;
const clientID = process.env.clientId;

const commands = [];
const foldersPath = path.join(__dirname , `commands`);
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const rest = new REST().setToken(token);


    (async () => {
        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);
    
            const data = await rest.put(
                Routes.applicationGuildCommands(clientID, guildID),
                { body: commands },
            );
    
            console.log(`✅ Successfully reloaded ${data.length} application (/) commands.`);
            console.log(`📋 Commands: ${data.map(cmd => cmd.name).join(', ')}`);
        } catch (err) {
            console.error('❌ Failed to register commands:', err);
        }
    })();
    
