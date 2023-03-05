const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors())
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: '08e49ada71324b2c80cc6291c245c23b',
        clientSecret: '2876029390b145ec8ba0af7f77a01b5c',
        refreshToken
    })

    spotifyApi.refreshAccessToken().then(
        (data) => {
            res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in,
            })

        }).catch(() => {
            res.sendStatus(400)
        })  
    })

app.post('/login', (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: '08e49ada71324b2c80cc6291c245c23b',
        clientSecret: '2876029390b145ec8ba0af7f77a01b5c'

    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in

        })
    })
        .catch(() => {
            res.sendStatus(400)
            console.log('error')
        })
})
