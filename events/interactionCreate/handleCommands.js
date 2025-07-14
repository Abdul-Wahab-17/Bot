const getLocalCommands = require("../../utils/getLocalCommands")

module.exports = async (client , interaction)=>{

    const localCommands = getLocalCommands();

    try {
        const cmdObject = localCommands.find( (cmd)=> cmd.name === interaction.commandName)

        if (!cmdObject){ return;}
        await cmdObject.callback(client , interaction);

    } catch (error) {
        console.error(error)
        
    }
5

//      if (interaction.isButton()){
//       try {
//          const role = interaction.guild.roles.cache.get(interaction.customId)
//        if (!role){
//         interaction.reply({
//             content:"No role",
//             ephemeral:true
//         })
//         return
//        }
//        const hasRole = interaction.member.roles.cache.has(role.id)
//        if (hasRole){
//         await interaction.member.roles.remove(role)
//         await interaction.reply({
//             content:"Role has been removed",
//             ephemeral:true
//         })
//         return
//        }
//        await interaction.member.roles.add(role)
//         await interaction.reply({
//             content:"Role has been added",
//             ephemeral:true
//         })
//         return
//       } catch (error) {
//         console.error(error)
//       }
//     }

//    if ( interaction.commandName === `ping`) {
//     interaction.reply(`Pong!`); 
//     return;
// }

// if (interaction.commandName === 'hello'){
//     interaction.reply(`Hello ${interaction.member.user}`)
//     return;
// }

//     if( interaction.commandName === `user-info`){
//         const embed = new EmbedBuilder()
//         .setTitle(interaction.member.user.globalName).
//         setColor(`Random`).setThumbnail(interaction.member.user.avatarURL())
//         .setFields([
//             { name:`Joined Server` , value:`${interaction.member.joinedAt} `},
//             {name:`Joined Discord` , value:`${interaction.member.user.createdAt} `},
//         ])
//         .setFooter( {text:`ID: ${interaction.member.user.id} `})
        
//         interaction.reply({ embeds: [embed]})
//     }



}