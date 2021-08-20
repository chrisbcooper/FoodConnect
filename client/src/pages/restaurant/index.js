import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SyncLoader from 'react-spinners/SyncLoader';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import {
    loadRestaurant,
    wishRestaurant,
    unwishRestaurant,
    likeRestaurant,
    unlikeRestaurant,
    visitRestaurant,
    unvisitRestaurant,
} from '../../redux/restaurants';

import { Text } from '../../components';

const Restaurant = () => {
    const dispatch = useDispatch();
    const { restaurant, isLoading, error } = useSelector((state) => state.restaurant);
    const { data } = useSelector((state) => state.user);
    const { id } = useParams();
    let wish = false;
    let visited = false;
    let like = false;

    useEffect(() => {
        dispatch(loadRestaurant({ id }));
    }, [dispatch, id]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        <SyncLoader loading={true} size={150} />;
    }

    if (restaurant.wishlist && data) {
        wish = restaurant.wishlist.filter((user) => user.user.toString() === data._id).length !== 0;
    }
    if (restaurant.visited && data) {
        visited = restaurant.visited.filter((user) => user.user.toString() === data._id).length !== 0;
    }
    if (restaurant.likes && data) {
        like = restaurant.likes.filter((user) => user.like.toString() === data._id).length !== 0;
    }
    return (
        <Text>
            Restaurant {restaurant.name}
            {restaurant.wishlist && restaurant.wishlist.length}
            {wish ? (
                <Button
                    onClick={async (event) => {
                        dispatch(unwishRestaurant({ id }));
                    }}
                >
                    Unwish
                </Button>
            ) : (
                <Button
                    onClick={async (event) => {
                        dispatch(wishRestaurant({ id }));
                    }}
                >
                    Wish
                </Button>
            )}
            {restaurant.visited && restaurant.visited.length}
            {visited ? (
                <Button
                    onClick={async (event) => {
                        dispatch(unvisitRestaurant({ id }));
                    }}
                >
                    Unvisit
                </Button>
            ) : (
                <Button
                    onClick={async (event) => {
                        dispatch(visitRestaurant({ id }));
                    }}
                >
                    visit
                </Button>
            )}
            {restaurant.likes && restaurant.likes.length}
            {like ? (
                <Button
                    onClick={async (event) => {
                        dispatch(unlikeRestaurant({ id }));
                    }}
                >
                    Unlike
                </Button>
            ) : (
                <Button
                    onClick={async (event) => {
                        dispatch(likeRestaurant({ id }));
                    }}
                >
                    Like
                </Button>
            )}
            <Link to={`/reviews/restaurant/${id}/create`}>Create Review for Restaurant</Link>
        </Text>
    );
};

export default Restaurant;
