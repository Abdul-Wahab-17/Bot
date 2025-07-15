require(`dotenv`).config({quite:true});
const {Client , GatewayIntentBits } = require(`discord.js`);
const eventHandler = require("./handlers/eventHandler.js");


const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages , 
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers , 
	]
});

eventHandler(client);

client.login(process.env.TOKEN);


