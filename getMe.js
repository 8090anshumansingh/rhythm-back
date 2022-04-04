import fs from "fs";
import SpotifyWebApi from "spotify-web-api-node";
const token =
  "BQBezrDlJ7ttGQaCmxI__ZCCPcTVJY0Niyfib8nR82j12Tm2qZSu0RTzfDR27e-9pADWv-UtYo6wi3nKr-dT87JxI1wsLfRmZkBllRZpIJpLb87IFPQ26bJaYFptycwM8jGldjyKu3KtH9PQPffWsy-8otHHjoNOz_qnANv6yORe0qyGax1VagqxomzQmsvgPW4lfmFedpue8dDh62ySnkhXFZ6fYuX9ojQzW3Mw6fBwr_2CWdFcpHpKRqpU_9s1Yj5jrkjcJww5J9Beavrlku-WeARXZrRcKPOuI_8vpe_rNYat";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    // console.log(me.body);
    getUserPlaylists(me.body.id);
  })().catch((e) => {
    console.error(e);
  });
}

// GET MY PLAYLISTS
async function getUserPlaylists(userName) {
  const data = await spotifyApi.getUserPlaylists(userName);

  console.log("---------------+++++++++++++++++++++++++");
  let playlists = [];

  for (let playlist of data.body.items) {
    console.log(playlist.name + " " + playlist.id);

    let tracks = await getPlaylistTracks(playlist.id, playlist.name);
    // console.log(tracks);

    const tracksJSON = { tracks };
    let data = JSON.stringify(tracksJSON);
    // console.log("name :", data[0].name);
    // console.log("artist :", data[0].artists[0].name);
    // console.log("name :", data[0].preview_url);
    fs.writeFileSync(playlist.name + ".json", data);
  }
}

//GET SONGS FROM PLAYLIST
async function getPlaylistTracks(playlistId, playlistName) {
  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: "items",
  });

  // console.log("The playlist contains these tracks", data.body);
  // console.log('The playlist contains these tracks: ', data.body.items[0].track);
  // console.log("'" + playlistName + "'" + " contains these tracks:");
  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track;

    // console.log(track);

    var newTrack = {
      title: track.name,
      artist: track.artists[0].name,
      preview_url: track.preview_url,
      duration: track.duration_ms,
      album: track.album.name,
      image: track.album.images[2].url,
    };
    tracks.push(newTrack);
    // console.log(
    //   track.name +
    //     " : " +
    //     track.artists[0].name +
    //     " : " +
    //     track.preview_url +
    //     " : " +
    //     track.duration_ms +
    //     " : " +
    //     track.album.name +
    //     " : " +
    //     track.album.images[2].url
    // );
  }

  console.log("---------------+++++++++++++++++++++++++");
  return tracks;
}

getMyData();

// id: '2ysn3q6i0qcweai64wfmv7x02'
