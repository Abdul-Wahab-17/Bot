const { spotify } = require(`../../spotify`);
const db = require(`../../db`);

module.exports = {
  name: `top-tracks`,
  description: `Get your top Spotify tracks`,
  callback: async (client, interaction) => {
    const userId = interaction.member.user.id;

    db.query(`SELECT * FROM Token WHERE userId = ?`, [userId], async (err, results) => {
      if (err) {
        console.error(err);
        return interaction.reply('Database error occurred.');
      }

      if (results.length === 0 || !results[0].accessToken) {
        return interaction.reply('You are not logged in, please do /login to login.');
      }

      spotify.setAccessToken(results[0].accessToken);

      try {
        const data = await spotify.getMyTopTracks({
          time_range: 'long_term',
        });

        const tracks = data.body.items;
        let trackNames = tracks.map((t) => t.name).join('\n') || 'No top tracks found.';

        interaction.reply(trackNames);
      } catch (err) {
        console.error('Spotify API error:', err);
        interaction.reply('Failed to fetch top tracks. Please try again.');
      }
    });
  },
};
