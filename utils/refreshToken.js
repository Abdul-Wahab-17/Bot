const {spotify} = require(`../spotify`);
const db = require(`../db`);
const util = require('util');

const query = util.promisify(db.query).bind(db);


module.exports = async (userId , refreshToken)=>{
        try {
          spotify.setRefreshToken(refreshToken); 
          const data = await spotify.refreshAccessToken(); 

          token = data.body.access_token;
          const expires_in = data.body.expires_in;

          await query(
            `UPDATE Token SET accessToken = ?, expiryDate = ? WHERE userId = ?`,
            [token, Date.now() + expires_in * 1000, userId]
        );

        return token;

        } catch (err) {
          console.error('Failed to refresh token:', err);
          return `There was an error, Please try again`;
        }
}