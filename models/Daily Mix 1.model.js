import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Mix1Schema = new Schema({
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

const Mix1 = mongoose.model("Mix1", Mix1Schema);

export default Mix1;
