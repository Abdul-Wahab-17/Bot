const redis = require(`../../redisClient`);
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

module.exports = {
    name:`login`,
    description:`log-in your user to the bot`,
    callback: async (client , interaction)=>{

        

        let token = await redis.get(interaction.user.id);

        if (token){
            interaction.reply(`You are already logged in`);
            return;
        }

        const scopes = ['user-read-private', 'user-top-read', 'user-read-email'];
    const state = `discord_${userId}`;
    const authUrl = spotifyApi.createAuthorizeURL(scopes, state);

    interaction.reply(`Click to login your user ${authUrl}`);


    }
}