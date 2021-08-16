import mongoose from 'mongoose';
 
const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'group',
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
        }
      }
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
        },
        text: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ],
    date: {
      type: Date,
      default: Date.now,
    }
  },
  { timestamps: true },
);
 
const Post = mongoose.model('Post', postSchema);
 
export default Post;