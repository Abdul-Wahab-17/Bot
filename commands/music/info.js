const { spotify } = require(`../../spotify`);
const db = require(`../../db`);
const refreshToken = require("../../utils/refreshToken");

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
        token = await refreshToken(userId , result[0].refreshToken);
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
