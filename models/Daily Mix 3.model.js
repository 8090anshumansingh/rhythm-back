import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Mix3Schema = new Schema({
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

const Mix3 = mongoose.model("Mix3", Mix3Schema);

export default Mix3;
