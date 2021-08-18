import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/user';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { data, isLoading } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    if (data && !isLoading) {
        return <text>{data.name}</text>;
    }
    return <div>Dashboard</div>;
};

export default Dashboard;
