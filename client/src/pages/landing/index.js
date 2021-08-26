import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import styled from 'styled-components';

const TotalDiv = styled.div`
    height: 100%;
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
`;

const InnerDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const Login = () => {
    const { isAuthenticated } = useSelector((state) => state.user);

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <TotalDiv>
            <InnerDiv>
                <h2>Welcome to FoodConnect!</h2>
                <p>Explore and share about local restaurants!</p>
                <div style={{ height: 10 }} />
                <Button as={Link} to='/login'>
                    Login
                </Button>
                <div style={{ height: 10 }} />
                <Button as={Link} to='/register'>
                    Register
                </Button>
            </InnerDiv>
        </TotalDiv>
    );
};

export default Login;
