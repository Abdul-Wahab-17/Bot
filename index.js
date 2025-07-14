require(`dotenv`).config({quite:true});
const {Client , IntentsBitField } = require(`discord.js`);
const eventHandler = require("./handlers/eventHandler.js");


const client = new Client({ 
	intents: [
		IntentsBitField.Flags.GuildMembers , 
		IntentsBitField.Flags.GuildMessages , 
		IntentsBitField.Flags.MessageContent,
	]
});

eventHandler(client);

client.login(process.env.TOKEN);


