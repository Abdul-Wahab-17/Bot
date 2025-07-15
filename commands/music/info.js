const { spotify } = require(`../../spotify`);
const db = require(`../../db`);

module.exports = {
  name: `info`,
  description: `Get your top Spotify info`,
  callback: async (client, interaction) => {
    const userId = interaction.member.user.id;

    db.query(`SELECT * FROM Token WHERE userId = ?`, [userId], async (err, result) => {
      if (err) {
        console.error(err);
        return interaction.reply('Database error. Try again later.');
      }

      if (result.length === 0) {
        return interaction.reply(`You are not logged in. Please do /login.`);
      }

      let token = result[0].accessToken;
      const expiryDate = parseInt(result[0].expiryDate);
      const now = Date.now();

      if (now >= expiryDate) {
        try {
          spotify.setRefreshToken(result[0].refreshToken); 
          const data = await spotify.refreshAccessToken(); 

          token = data.body.access_token;
          const expires_in = data.body.expires_in;

          db.query(
            `UPDATE Token SET accessToken = ?, expiryDate = ? WHERE userId = ?`,
            [token, Date.now() + expires_in * 1000, userId],
            (err) => {
              if (err) console.error('DB update error:', err);
            }
          );
        } catch (err) {
          console.error('Failed to refresh token:', err);
          return interaction.reply('Your Spotify session expired. Please /login again.');
        }
      }

      try {
        spotify.setAccessToken(token);
        const data = await spotify.getMe();
        const user = data.body.display_name || 'Unknown';
        const birthdate = data.body.birthdate || 'Not provided';

        await interaction.reply(`${user} ${birthdate}`);
      } catch (err) {
        console.error('Spotify API error:', err);
        await interaction.reply('Could not fetch your Spotify info. Try /login again.');
      }
    });
  },
};
