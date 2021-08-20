import React, { useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';
import { register as reg } from '../../redux/user';
import { ImageInput } from '../../components';

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
    const [image, setImage] = useState();
    const fileInput = useRef(null);

    const onSubmit = async (data) => {
        const res = await dispatch(
            reg({
                name: data.name,
                email: data.email,
                password: data.password,
                image,
            })
        );
        if (res.payload) {
            history.push('/dashboard');
        }
    };

    return (
        <div>
            Register
            <>
                <Form
                    onSubmit={(event) => {
                        event.preventDefault();
                        handleSubmit(onSubmit)();
                    }}
                >
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
                    <Form.Group>
                        <Form.Label>Profile Picture</Form.Label>
                        <ImageInput image={image} setImage={setImage} fileInput={fileInput}></ImageInput>
                    </Form.Group>
                </Form>
                <HeaderDiv>
                    <SubmitButton
                        onClick={handleSubmit((data) => {
                            onSubmit(data);
                        })}
                        variant='primary'
                    >
                        Register
                    </SubmitButton>
                </HeaderDiv>
            </>
        </div>
    );
};

export default Register;
