import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SyncLoader from 'react-spinners/SyncLoader';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

import { Text, ImageInput } from '../../components';
import { useHistory, useParams } from 'react-router-dom';
import { loadGroup } from '../../redux/groups';
import { postCreate } from '../../redux/posts';

const HeaderDiv = styled.div`
    text-align: center;
`;

const SubmitButton = styled(Button)`
    margin-top: 20px;
    margin-bottom: 30px;
`;

const PostCreate = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();
    const { group, isLoading, error } = useSelector((state) => state.group);
    const [image, setImage] = useState();
    const fileInput = useRef(null);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(loadGroup({ id }));
        }
    }, [dispatch, id]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        <SyncLoader loading={true} size={150} />;
    }

    const onSubmit = async (data) => {
        const res = await dispatch(
            postCreate({
                caption: data.caption,
                group: id,
                image,
            })
        );
        if (res.payload) {
            if (id) {
                history.push(`/groups/${id}`);
            } else {
                history.push(`/posts/${res.payload._id}`);
            }
        }
    };

    return (
        <>
            CREating a post for {id && group.name}
            <Form>
                <Form.Group>
                    <Form.Label>Caption</Form.Label>
                    <Form.Control {...register('caption', { required: true })} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Post Image</Form.Label>
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

export default PostCreate;
