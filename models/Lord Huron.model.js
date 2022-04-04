import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LordHuronSchema = new Schema({
  tracks: [
    {
      title: { type: String },
      artist: { type: String },
      preview_url: { type: String },
      duration: { type: Number },
      album: { type: String },
      image: { type: String },
      isLiked: { type: Boolean },
    },
  ],
});

const LordHuron = mongoose.model("LordHuron", LordHuronSchema);

export default LordHuron;
