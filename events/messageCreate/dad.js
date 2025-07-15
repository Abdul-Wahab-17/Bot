module.exports = (client , message)=> {
   
    if (message.content.split(` `)[0].toLowerCase() === `im`){
        message.reply(`Hi ${message.content.substring(3)}, I'm dad.`);
    }

}