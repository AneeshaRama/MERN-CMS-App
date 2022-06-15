import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    content: {},
    categories: [
      {
        type: mongoose.Types.ObjectId,
        ref: "category",
      },
    ],
    published: {
      type: Boolean,
      default: true,
    },
    postedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    featuredImage: {
      type: mongoose.Types.ObjectId,
      ref: "media",
    },
  },
  { timestamps: true }
);

export default mongoose.model("post", postSchema);
