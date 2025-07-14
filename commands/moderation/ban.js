module.exports = {
    name:`ban`,
    description:`bans a user`,
    callback: (client , interaction)=>{
        interaction.reply(`Pong ${client.ws.ping}!`);

    }
}