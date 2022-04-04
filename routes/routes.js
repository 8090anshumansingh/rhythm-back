import express from "express";
const router = express.Router();

import { registerUser, loginUser } from "../controllers/user.controllers.js";
import {
  getLordHuron,
  getHindiSongs,
  getDecadeBest,
  getYearBest,
  getMix1,
  getMix3,
  getMix5,
  getHimym,
  getKK,
  getRecommends,
  getDarshan,
  getSheeran,
  getTwilight,
  createLord,
  getAll,
  giveId,
} from "../controllers/song.controllers.js";
import { likeSong,getAllLiked,dislikeSong,getSongFromId,getUserFromId,getLikedArtists,getUsersWithArtists,getFriends,getPosters,setDp,getFriendsNew} from "../controllers/user.controllers.js";
import {createConversation,getConversationFromUser,findConversation} from "../controllers/conversation.controllers.js";
import {createMessage,getMessageFromConversation} from "../controllers/message.controllers.js";

router.get("/findConversation/:firstUserId/:secondUserId",findConversation);
router.get("/getFriendsNew/:userId",getFriendsNew);
router.post("/setDp", setDp);
router.post("/getUserFromId", getUserFromId);
router.post("/createConversation", createConversation);
router.post("/createMessage", createMessage);
router.get("/getConversationFromUser/:userId", getConversationFromUser);
router.get("/getFriends/:userId", getFriends);
router.get("/getPosters/:userId", getPosters);
router.get("/getLikedArtists/:userId", getLikedArtists);
router.get("/getUsersWithArtists", getUsersWithArtists);
router.get("/getMessageFromConversation/:conversationId", getMessageFromConversation);
router.post("/create/lord", createLord);
router.post("/giveId", giveId);
router.post("/likeSong", likeSong);
router.post("/dislikeSong", dislikeSong);
router.post("/getAllLiked", getAllLiked);
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.post("/getSongFromId", getSongFromId);
router.get("/allSongs/lordHuron", getLordHuron);
router.get("/allSongs", getAll);
router.get("/allSongs/hindiSongs", getHindiSongs);
router.get("/allSongs/decadeBest", getDecadeBest);
router.get("/allSongs/yearBest", getYearBest);
router.get("/allSongs/mix1", getMix1);
router.get("/allSongs/mix3", getMix3);
router.get("/allSongs/mix5", getMix5);
router.get("/allSongs/himym", getHimym);
router.get("/allSongs/kk", getKK);
router.get("/allSongs/recommends", getRecommends);
router.get("/allSongs/darshan", getDarshan);
router.get("/allSongs/sheeran", getSheeran);
router.get("/allSongs/twilight", getTwilight);

export default router;
