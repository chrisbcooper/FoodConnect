import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, loadUser, login } from '../../redux/user';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Login = () => {
    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector((state) => state.user);

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <div>
            <Button
                onClick={async (event) => {
                    const res = await dispatch(
                        login({
                            email: '1@2.com',
                            password: 'password',
                        })
                    );
                    console.log(res);
                    if (res.type !== login.rejected) {
                        dispatch(loadUser());
                    }
                }}
            >
                Login
            </Button>
            <Button
                onClick={async (event) => {
                    const res = await dispatch(
                        register({
                            email: '1@2.com',
                            password: 'password',
                            name: 'chris',
                        })
                    );
                    if (res.type !== register.rejected) {
                        dispatch(loadUser());
                    }
                }}
            >
                register
            </Button>
        </div>
    );
};

export default Login;
