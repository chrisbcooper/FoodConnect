import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SyncLoader from 'react-spinners/SyncLoader';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

import { Text, ImageInput } from '../../components';
import { createGroup } from '../../redux/groups';
import { useHistory } from 'react-router-dom';

const HeaderDiv = styled.div`
    text-align: center;
`;

const SubmitButton = styled(Button)`
    margin-top: 20px;
    margin-bottom: 30px;
`;

const GroupCreate = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();
    const { isLoading, error } = useSelector((state) => state.group);
    const [image, setImage] = useState();
    const fileInput = useRef(null);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        <SyncLoader loading={true} size={150} />;
    }

    const onSubmit = async (data) => {
        const res = await dispatch(
            createGroup({
                name: data.name,
                bio: data.bio,
                image,
            })
        );
        if (res.payload) {
            history.push(`/groups/${res.payload._id}`);
        }
    };

    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control {...register('name', { required: true })} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Group Bio</Form.Label>
                    <Form.Control {...register('bio', { required: true })} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Group Image</Form.Label>
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
                    Submit Deal
                </SubmitButton>
            </HeaderDiv>
        </>
    );
};

export default GroupCreate;
