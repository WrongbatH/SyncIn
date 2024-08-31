const express = require('express');
const { getToken } = require('./spotify');
const querystring = require('node:querystring');
require('dotenv').config();

const app = express();

app.use(express.static('src'));

app.get('/login', async (req, res) => {

  // var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email';
  var redirect_uri = 'http://localhost:8080/callback';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.spotify_client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      // state: state
    }));
})

app.get('/callback', async (req, res) => {
  console.log(req.query);
  res.sendFile(__dirname + '/src/callback/callback.html');
})

app.get('/getclienttoken', async (req, res) => {
  // check if we have the song cached already
  // return the currently cached song that our user is listening to
  // if nothing cached, return what the spotify API says they are listening to, and cache the response.
  res.send(await getToken());  
})

app.listen(process.env.port, () => {
  console.log(`server is listening on port ${process.env.port}`);
});