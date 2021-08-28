import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';
import { editProfile, loadUser } from '../../redux/user';
import { ImageInput, Loader } from '../../components';

const HeaderDiv = styled.div`
    text-align: center;
`;

const SubmitButton = styled(Button)`
    margin-top: 20px;
    margin-bottom: 30px;
`;

const EditProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [image, setImage] = useState();
    const fileInput = useRef(null);
    const { data, isLoading, error } = useSelector((state) => state.user);

    const { register, handleSubmit, setValue } = useForm();

    const onSubmit = async (d) => {
        const res = await dispatch(
            editProfile({
                name: d.name,
                bio: d.bio,
                image,
            })
        );
        if (res.payload) {
            history.push('/me');
        }
    };

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    if (error) {
        return <text>Error!!</text>;
    } else if (isLoading) {
        return <Loader />;
    }

    if (data) {
        setValue('name', data.name);
        setValue('bio', data.bio);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ textAlign: 'center', marginTop: 10 }}>
                <h3>Edit Profile</h3>
            </div>
            <Form
                onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit(onSubmit)();
                }}
            >
                <input type='submit' style={{ display: 'none' }} />
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control {...register('name', { required: true })} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Bio</Form.Label>
                    <Form.Control {...register('bio', { required: true })} />
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
                    Confirm
                </SubmitButton>
            </HeaderDiv>
        </div>
    );
};

export default EditProfile;
