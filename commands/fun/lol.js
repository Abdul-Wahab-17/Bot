const { SlashCommandBuilder} = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
    .setName(`lol`)
    .setDescription(`replies with hi`),
    async execute(interaction){
        interaction.getChannel().send(`hi`);
    }
};