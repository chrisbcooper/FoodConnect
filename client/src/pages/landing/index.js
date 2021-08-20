import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

const Login = () => {
    const { isAuthenticated } = useSelector((state) => state.user);

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <div>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
        </div>
    );
};

export default Login;
