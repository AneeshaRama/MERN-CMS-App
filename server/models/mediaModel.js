import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    url: String,
    public_id: String,
    postedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("media", mediaSchema);
