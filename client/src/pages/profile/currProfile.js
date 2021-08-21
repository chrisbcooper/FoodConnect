import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/user';

import { Loader } from '../../components';

const Profile = () => {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    if (error) {
        return <text>Error!!</text>;
    } else if (isLoading) {
        return <Loader />;
    }
    return <div>Me {data.name}</div>;
};

export default Profile;
