import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      max: 20000,
    },
    postedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: mongoose.Types.ObjectId,
      ref: "post",
    },
  },
  { timestamps: true }
);

export default mongoose.model("comment", commentSchema);
