import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Mix5Schema = new Schema({
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

const Mix5 = mongoose.model("Mix5", Mix5Schema);

export default Mix5;
