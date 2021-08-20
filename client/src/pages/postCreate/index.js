import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/user';
import SyncLoader from 'react-spinners/SyncLoader';

import { Text } from '../../components';

const PostCreate = () => {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        <SyncLoader loading={true} size={150} />;
    }

    return <Text>PostCreate</Text>;
};

export default PostCreate;
