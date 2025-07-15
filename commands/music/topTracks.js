const { spotify} = require(`../../spotify`);
const redis = require(`../../redisClient`);

module.exports = {
    name:`top-tracks`,
    description:`Get your top spotify tracks`,
    callback: async (client , interaction)=>{

        let userId = interaction.member.user.id;
        let token = await redis.get(userId);

        if (!token){
            interaction.reply(`You are not logged in, please do /login to login`);
            return;
        }
        

         spotify.setAccessToken(token);



        let data = await  spotify.getMyTopTracks({
            time_range:"long_term",
        });
        let tracks = data.body.items;
        let trackNames = ``;

        for (const track of tracks){
            trackNames = trackNames + track.name +`\n`;
        }
        
        interaction.reply(trackNames);
        

    }
}