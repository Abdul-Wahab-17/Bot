const {SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('deletechannel')
    .setDescription('Deletes the channel it is used in'),
    async execute(interaction){
        if (!interaction.memberPermissions.has('ManageChannels')){
            return;
        }   
    const message = await interaction.channel.messages.fetch({ limit:1}).first();
      var words = message.content.split(' ');
      if (words[0] == `I'm`){
        return interaction.channel.send(`Hi ${message}, I'm dad.`);
      }
    }
};
