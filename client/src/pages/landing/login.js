import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';
import { login } from '../../redux/user';

const HeaderDiv = styled.div`
    text-align: center;
`;

const SubmitButton = styled(Button)`
    margin-top: 20px;
    margin-bottom: 30px;
`;

const Login = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = async (data) => {
        const res = await dispatch(login(data));
        if (res.payload) {
            history.push('/dashboard');
        }
    };

    return (
        <div>
            LOGIN
            <>
                <Form
                    onSubmit={(event) => {
                        event.preventDefault();
                        handleSubmit(onSubmit)();
                    }}
                >
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control {...register('email', { required: true })} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' {...register('password', { required: true })} />
                    </Form.Group>
                </Form>
                <HeaderDiv>
                    <SubmitButton
                        onClick={handleSubmit((data) => {
                            onSubmit(data);
                        })}
                        variant='primary'
                    >
                        Login
                    </SubmitButton>
                </HeaderDiv>
            </>
        </div>
    );
};

export default Login;
