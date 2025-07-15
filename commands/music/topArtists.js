const { spotify} = require(`../../spotify`);
const redis = require(`../../redisClient`);

module.exports = {
    name:`top-artists`,
    description:`Get your top spotify artists`,
    callback: async (client , interaction)=>{

        let userId = interaction.member.user.id;
        let token = await redis.get(userId);

        if (!token){
            interaction.reply(`You are not logged in, please do /login to login`);
            return;
        }
        

         spotify.setAccessToken(token);



        let data = await  spotify.getMyTopArtists({
            time_range:"long_term",
        });
        let artists = data.body.items;
        let artistNames = ``;

        for (const artist of artists){
            artistNames = artistNames + artist.name +`\n`;
        }
        
        interaction.reply(artistNames);
        

    }
}