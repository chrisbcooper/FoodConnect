import mongoose from 'mongoose';
 
const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    bio: {
        type: String,
    }, 
    image: {
        type: String
    },
    users: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
            join_date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    posts: [
        {
            post: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'post'
            }
        }
    ]
  },
  { timestamps: true },
);
 
const Group = mongoose.model('Group', groupSchema);
 
export default Group;