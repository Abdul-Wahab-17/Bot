module.exports = {
    name:`ping`,
    description:`Replies with the bot's ping`,
    callback: (client , interaction)=>{
        interaction.reply(`Pong ${client.ws.ping}!`);

    }
}