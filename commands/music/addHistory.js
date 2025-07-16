const {ApplicationCommandOptionType} = require(`discord.js`);
const axios= require(`axios`);
const admzip = require(`adm-zip`);

module.exports = {
    name:`add-history`,
    description:`Add your spotify history`,
    options: [
        {
            name:`folder`,
            description:`upload the zipped folder sent to you by discord`,
            type: ApplicationCommandOptionType.Attachment,
            required:true
        }
    ],
    callback: async (client , interaction)=>{
        let attachment = interaction.options.getAttachment(`folder`);

        if (!attachment.name.endsWith(".zip")) {
      return interaction.reply("Please upload a .zip file.");
    }

    await interaction.reply("Processing your streaming history...");

    const response = await axios.get(attachment.url, { responseType: "arraybuffer" });
    const zip = new admzip(response.data);
    const entries = zip.getEntries();

    

    console.log(response);


    }
}