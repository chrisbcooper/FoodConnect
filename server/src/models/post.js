import mongoose from 'mongoose';
 
const postSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true },
);
 
const Post = mongoose.model('Post', postSchema);
 
export default Post;