import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, loadUser } from '../../redux/user';
import { Redirect } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector((state) => state.user);

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div>
            Login
            <button
                onClick={async (event) => {
                    await dispatch(
                        register({
                            email: '1@2.com',
                            password: 'password',
                            name: 'chris',
                        })
                    );
                    await dispatch(loadUser());
                }}
            >
                register
            </button>
        </div>
    );
};

export default Login;
