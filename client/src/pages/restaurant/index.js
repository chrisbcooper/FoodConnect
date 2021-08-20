import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SyncLoader from 'react-spinners/SyncLoader';
import { useParams } from 'react-router-dom';

import { loadRestaurant } from '../../redux/restaurants';

import { Text } from '../../components';

const Restaurant = () => {
    const dispatch = useDispatch();
    const { restaurant, isLoading, error } = useSelector((state) => state.restaurant);
    const { id } = useParams();
    const load = useCallback(async () => {
        await dispatch(loadRestaurant({ id }));
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        <SyncLoader loading={true} size={150} />;
    }

    return <Text>Restaurant {restaurant.name}</Text>;
};

export default Restaurant;
