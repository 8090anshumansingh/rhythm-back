import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import SpotifyWebApi from "spotify-web-api-node";
import upload from "./multer.js";
// const upload=require('./multer');
import cloudinary from "./cloudinary.js";
import fs from "fs";


dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(Cors());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "app-remote-control",
  "user-read-email",
  "user-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-modify-private",
  "user-library-modify",
  "user-library-read",
  "user-top-read",
  "user-read-playback-position",
  "user-read-recently-played",
  "user-follow-read",
  "user-follow-modify",
];
var spotifyApi = new SpotifyWebApi({
  clientId: "982ee71c94964e128eaca616a21e1a1d",
  clientSecret: "cf0d696880bf4b4192b1db7568ed071d",
  redirectUri: "http://localhost:8800/callback",
});

app.use("/", routes);

// app.use('/upload-images',upload.array('image'),async(req,res)=>{

//   const uploader=async (path)=> await cloudinary.uploads(path,'Images')

//   if(req.method==='POST')
//   {
//     const urls=[];
//     const files=req.files;
//     for (const file of files){
//       const {path}=file;
//       const newPath=await uploader(path);
//       urls.push(newPath);
//       fs.unlinkSync(path);
//     }
//     res.status(200).json({
//       message:'Images Uploaded Successfully',
//       data:urls
//     })
//   }
//   else{
//     res.status(500).json({
//        err:"Image upload failed"
//     })
//   }

// })

app.get("/", (req, res) => {
  res.send("Happy Coding");
});

app.get("/verify", (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.get("/callback", (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error("Callback Error:", error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      const access_token = data.body["access_token"];
      const refresh_token = data.body["refresh_token"];
      const expires_in = data.body["expires_in"];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log("access_token:", access_token);
      console.log("refresh_token:", refresh_token);

      console.log(
        `Sucessfully retreived access token. Expires in ${expires_in} s.`
      );
      res.send("Success! You can now close the window.");

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body["access_token"];

        console.log("The access token has been refreshed!");
        console.log("access_token:", access_token);
        spotifyApi.setAccessToken(access_token);
      }, (expires_in / 2) * 1000);
    })
    .catch((error) => {
      console.error("Error getting Tokens:", error);
      res.send(`Error getting Tokens: ${error}`);
    });
});

app.listen(port, function () {
  console.log("listening on localhost:" + port);
});
