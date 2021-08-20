import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/user';
import SyncLoader from 'react-spinners/SyncLoader';
import { useParams } from 'react-router-dom';

import { Text } from '../../components';

const Post = () => {
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

    return <Text>POST {id}</Text>;
};

export default Post;
