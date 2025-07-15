require(`dotenv`).config({quiet:true});
const SpotifyWebAPI = require(`spotify-web-api-node`);
const express = require(`express`);
const db = require(`./db`);


const app =express();
const spotify = new SpotifyWebAPI({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI, 
});

const scopes = ['user-read-private', 'user-read-email', 'user-top-read', 'user-read-playback-state'];


app.get(`/login` , (req,res)=>{
    const authURL = spotify.createAuthorizeURL(scopes , `some-state`)
    res.redirect(authURL);
    
})

app.get(`/logout ` , ()=>{
    
})

app.get(`/callback` , async(req,res)=>{
    const code = req.query.code;
    try {
        const data = await spotify.authorizationCodeGrant(code);
        const state = req.query.state; 
        const userId = state.replace('discord_', '');
        const { access_token , refresh_token  , expires_in} = data.body;
        spotify.setAccessToken(access_token);
        spotify.setRefreshToken(refresh_token);

        db.query(`insert into Token (userId,accessToken,refreshToken,expiryDate) values (?,?,?,?)` , [userId , access_token , refresh_token , Date.now()+expires_in*1000] , (err)=>{
            if (err){
                console.error(err);
                return;
            }
        res.status(200).send(`You have logged in succesfully`);
        });

    } catch (error) {
        console.error(error);
    }
})

app.listen(process.env.PORT || 5000  , ()=>{
    console.log(`The auth server is active`);
})

