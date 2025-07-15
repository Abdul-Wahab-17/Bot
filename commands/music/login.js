const db = require(`../../db`);
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

module.exports = {
  name: `login`,
  description: `log-in your user to the bot`,
  callback: async (client, interaction) => {
    const userId = interaction.member.user.id;

    db.query(`SELECT * FROM Token WHERE userId = ?`, [userId], async (err, results) => {
      if (err) {
        console.error(err);
        return interaction.reply('Database error occurred.');
      }

      if (results.length > 0) {
        return interaction.reply('You are already logged in.');
      }

      const scopes = ['user-read-private', 'user-top-read', 'user-read-email'];
      const state = `discord_${userId}`;
      const authUrl = spotifyApi.createAuthorizeURL(scopes, state);

      interaction.reply(`Click to login your user: ${authUrl}`);
    });
  }
};
