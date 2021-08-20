import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SyncLoader from 'react-spinners/SyncLoader';
import { useParams } from 'react-router-dom';

import { loadUser } from '../../redux/user';

import { Text } from '../../components';

const Restaurant = () => {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useSelector((state) => state.user);
    const { id } = useParams();
    const load = useCallback(async () => {
        await dispatch(loadUser());
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        <SyncLoader loading={true} size={150} />;
    }

    return <Text>Restaurant {id}</Text>;
};

export default Restaurant;
