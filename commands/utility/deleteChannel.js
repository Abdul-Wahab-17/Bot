const {SlashCommandBuilder } = require('discord.js');


module.exports =  {
    data: new SlashCommandBuilder()
    .setName('deletechannel')
    .setDescription('Deletes the channel it is used in and sends the name of the deleter in the logs channel'),
    async execute(interaction){
        if (!interaction.memberPermissions.has('ManageChannels')){
            return;
        }   
        const guild = interaction.guild;
        const channel = guild.channels.fetch().filter( c => c.name === `logs` && c.type === 'GUILD_TEXT');
        const user = interaction.user;
        
        await interaction.channel.delete();
        channel.send(`The ${interaction.channel.name} channel was deleted by ${user.username}`);
    }
};
