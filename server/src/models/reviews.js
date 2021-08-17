import mongoose from 'mongoose';
 
const reviewSchema = new mongoose.Schema(
  {
    text: {
        type: String,
        required: true
    }, 
    image: {
        type: String
    },
    yelp_id: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    likes: [
        {
            user: mongoose.Schema.Types.ObjectId,
            required: true
        }
    ]
  },
  { timestamps: true },
);
 
const Review = mongoose.model('Review', reviewSchema);
 
export default Review;