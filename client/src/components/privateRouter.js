import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated, isLoading } = useSelector((state) => state.user);

    return (
        <Route
            {...rest}
            render={(props) => (!isAuthenticated && !isLoading ? <Redirect to="/" /> : <Component {...props} />)}
        />
    );
};

export default PrivateRoute;
