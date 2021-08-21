import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/user';

import { Text, Loader } from '../../components';
import { Redirect } from 'react-router-dom';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        return <Loader />;
    }

    return <Redirect to='/profiles' />;
};

export default Dashboard;
