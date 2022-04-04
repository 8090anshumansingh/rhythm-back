import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ChilloutSchema = new Schema({
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

const Chillout = mongoose.model("Chillout", ChilloutSchema);

export default Chillout;
