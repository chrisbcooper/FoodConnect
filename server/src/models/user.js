import mongoose from 'mongoose';
 
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String
    },
    bio: {
      type: String
    },
    following: [
      {
        following_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        block: {
          type: Boolean
        },
        following_since: {
          type: Date
        }
      }
    ],
    followers: [
      {
        follower_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        block: {
          type: Boolean
        },
        follower_since: {
          type: Date
        }
      }
    ],
    posts: [
      {
        post_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post'
        }
      }
    ],
    groups: [
      {
        group_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Group'
        }
      }
    ]
  },
  { timestamps: true },
);
 
const User = mongoose.model('User', userSchema);
 
export default User;