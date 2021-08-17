import User from '@app/models/user';
import Post from '@app/models/post';
import Group from '@app/models/group';
import Review from '@app/models/review';
import Restaurant from '@app/models/restaurant';

export const deleteUser = async (userID, user) => {
 
    // Delete all of the users's posts
    await Post.deleteMany({
        'user': userID
    });


    //Take the user out of all of the groups, and set owner to undefined if owner
    const groups = user.groups.map((group) => group.group.toString());

    await Group.updateMany( {
        '_id': groups
    }, {
        $pull: {
            'users': {
                user: userID
            }
        },

    });

    await Group.updateMany({
        'owner': userID
    }, {
        $set: {
           'owner': undefined 
        }
    });

    // Update following and followers of 

    const following = user.following.map((user) => user.following_id.toString());
    const followers = user.followers.map((user) => user.follower_id.toString());

    await User.updateMany({ 
        '_id': following
    }, {
        $pull: {
            'followers': {
                follower_id: userID
            }
        }
    })

    await User.updateMany({ 
        '_id': followers
    }, {
        $pull: {
            'following': {
                following_id: userID
            }
        }
    });


    const wishlist = user.wishlist.map((user) => user.restaurant.toString());
    const likelist = user.liked_restaurants.map((user) => user.restaurant.toString());
    const reviewList = user.reviews.map((user) => user.review.toString());
    const visitedList = user.visited_restaurants.map((user) => user.restaurant.toString());

    // Remove all restaurant connections
    await Restaurant.updateMany({
        '_id': wishlist
    }, {
        $pull: {
            'wishlist': {
                user: userID
            }
        }
    });

    await Restaurant.updateMany({
        '_id': likelist
    }, {
        $pull: {
            'likes': {
                like: userID
            }
        }
    });

    await Restaurant.updateMany({
        '_id': visitedList
    }, {
        $pull: {
            'visited': {
                user: userID
            }
        }
    });


    const restaurantList = reviewList.map((review) => review.restaurant_id.toString());

    await Restaurant.updateMany({
        '_id': restaurantList
    }, {
        $pull: {
            'reviews': {
                review: userID
            }
        }
    });

    // Delete reviews of users
    await Review.deleteMany({
        'user': userID
    });
}