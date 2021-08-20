import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SyncLoader from 'react-spinners/SyncLoader';
import { useParams } from 'react-router-dom';

import { loadUser } from '../../redux/user';

import { Text } from '../../components';

const Group = () => {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useSelector((state) => state.user);
    const { id } = useParams();

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        <SyncLoader loading={true} size={150} />;
    }

    return <Text>Group {id}</Text>;
};

export default Group;
