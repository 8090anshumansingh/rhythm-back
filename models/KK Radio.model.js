import mongoose from "mongoose";

const Schema = mongoose.Schema;

const KkSchema = new Schema({
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

const Kk = mongoose.model("Kk", KkSchema);

export default Kk;
