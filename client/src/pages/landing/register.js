import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';
import { register } from '../../redux/user';

const HeaderDiv = styled.div`
    text-align: center;
`;

const SubmitButton = styled(Button)`
    margin-top: 20px;
    margin-bottom: 30px;
`;

const Register = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = async (data) => {
        const res = await dispatch(register(data));
        if (res.payload) {
            history.push('/dashboard');
        }
    };

    return (
        <div>
            Register
            <>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control {...register('name', { required: true })} />
                    </Form.Group>
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
                        Submit Deal
                    </SubmitButton>
                </HeaderDiv>
            </>
        </div>
    );
};

export default Register;
