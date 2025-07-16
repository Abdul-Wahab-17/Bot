const { spotify } = require(`../../spotify`);
const db = require(`../../db`);

module.exports = {
  name: `top-artists`,
  description: `Get your top Spotify artists`,
  callback: async (client, interaction) => {
    const userId = interaction.member.user.id;

    db.query(`SELECT * FROM Token WHERE userId = ?`, [userId], async (err, result) => {
      if (err) {
        console.error(err);
        return interaction.reply('Database error occurred.');
      }

      if (result.length === 0 || !result[0].accessToken) {
        return interaction.reply('You are not logged in, please do /login to login.');
      }

            const expiryDate = parseInt(result[0].expiryDate);
            const now = Date.now();
      
            if (now >= expiryDate) {
              token = await refreshToken(userId , result[0].refreshToken);
            }
      spotify.setAccessToken(result[0].accessToken);

      try {
        const data = await spotify.getMyTopArtists({
          time_range: 'long_term',
        });

        const artists = data.body.items;
        let artistNames = artists.map((a) => a.name).join('\n') || 'No top artists found.';

        interaction.reply(artistNames);
      } catch (err) {
        console.error('Spotify API error:', err);
        interaction.reply('Failed to fetch top artists. Please try again.');
      }
    });
  },
};
