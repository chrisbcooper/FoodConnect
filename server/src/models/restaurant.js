import mongoose from 'mongoose';
 
const restaurantSchema = new mongoose.Schema(
  {
    yelp_id: {
        type: String,
        required: true
    }, 
    wishlist: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'user'
            }
        }
    ],
    visited: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'user'
            }
        }
    ],
    likes: [
        {
            like: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'user'
            }
        }
    ],
    reviews: [
        {
            review: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'review'
            }
        }
    ]
  },
  { timestamps: true },
);
 
const Restaurant = mongoose.model('Restaurant', restaurantSchema);
 
export default Restaurant;