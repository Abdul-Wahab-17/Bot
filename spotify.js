require(`dotenv`).config({quite:true});
const SpotifyWebAPI = require(`spotify-web-api-node`);


const spotify = new SpotifyWebAPI({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI, 
});


module.exports = {spotify};