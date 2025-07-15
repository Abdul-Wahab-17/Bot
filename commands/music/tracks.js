const { spotify} = require(`../../spotify`);

module.exports = {
    name:`get-tracks`,
    description:`Get your tracks`,
    callback: async (client , interaction)=>{

        let x = await  spotify.getMyTopArtists({});
        console.log(x);
        interaction.reply(x);

    }
}