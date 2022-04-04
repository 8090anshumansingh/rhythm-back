import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AllSchema = new Schema({
  tracks: [
    {
      id: { type: Number },
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

const All = mongoose.model("All", AllSchema);

export default All;
