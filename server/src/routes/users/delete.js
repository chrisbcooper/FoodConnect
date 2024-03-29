import User from '../../models/user.js';
import Post from '../../models/post.js';
import Group from '../../models/group.js';
import Review from '../../models/review.js';
import Restaurant from '../../models/restaurant.js';

export const deleteUser = async (userID, user) => {
    // Delete all of the users's posts
    await Post.deleteMany({
        user: userID,
    });

    //Take the user out of all of the groups, and set owner to undefined if owner
    const groups = user.groups.map((group) => group.group.toString());

    await Group.updateMany(
        {
            _id: groups,
        },
        {
            $pull: {
                users: {
                    user: userID,
                },
            },
        }
    );

    await Group.updateMany(
        {
            owner: userID,
        },
        {
            $set: {
                owner: undefined,
            },
        }
    );

    // Update following and followers of

    const following = user.following.map((user) => user.following_id.toString());
    const followers = user.followers.map((user) => user.follower_id.toString());

    await User.updateMany(
        {
            _id: following,
        },
        {
            $pull: {
                followers: {
                    follower_id: userID,
                },
            },
        }
    );

    await User.updateMany(
        {
            _id: followers,
        },
        {
            $pull: {
                following: {
                    following_id: userID,
                },
            },
        }
    );

    const wishlist = user.wishlist.map((usr) => usr.restaurant.toString());
    const likelist = user.liked_restaurants.map((usr) => usr.restaurant.toString());
    const reviewList = user.reviews.map((usr) => usr.review.toString());
    const visitedList = user.visited_restaurants.map((usr) => usr.restaurant.toString());

    // Remove all restaurant connections
    await Restaurant.updateMany(
        {
            _id: wishlist,
        },
        {
            $pull: {
                wishlist: {
                    user: userID,
                },
            },
        }
    );

    await Restaurant.updateMany(
        {
            _id: likelist,
        },
        {
            $pull: {
                likes: {
                    like: userID,
                },
            },
        }
    );

    await Restaurant.updateMany(
        {
            _id: visitedList,
        },
        {
            $pull: {
                visited: {
                    user: userID,
                },
            },
        }
    );

    const allReviews = await Review.find({
        _id: reviewList,
    });
    const restaurantList = allReviews.map((review) => review.restaurant_id.toString());

    await Restaurant.updateMany(
        {
            _id: restaurantList,
        },
        {
            $pull: {
                reviews: {
                    review: reviewList,
                },
            },
        }
    );

    // Delete reviews of users
    await Review.deleteMany({
        user: userID,
    });
};
