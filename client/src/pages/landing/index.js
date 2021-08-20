import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, loadUser, login } from '../../redux/user';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Login = () => {
    const dispatch = useDispatch();

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
