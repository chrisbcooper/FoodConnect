import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SyncLoader from 'react-spinners/SyncLoader';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

import { Text, ImageInput } from '../../components';
import { reviewCreate } from '../../redux/reviews';
import { useHistory, useParams } from 'react-router-dom';
import { loadRestaurant } from '../../redux/restaurants';

const HeaderDiv = styled.div`
    text-align: center;
`;

const SubmitButton = styled(Button)`
    margin-top: 20px;
    margin-bottom: 30px;
`;

const ReviewCreate = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();
    const { restaurant, isLoading, error } = useSelector((state) => state.restaurant);
    const [image, setImage] = useState();
    const fileInput = useRef(null);
    const { id } = useParams();

    useEffect(() => {
        dispatch(loadRestaurant({ id }));
    }, [dispatch, id]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        <SyncLoader loading={true} size={150} />;
    }

    const onSubmit = async (data) => {
        const res = await dispatch(
            reviewCreate({
                text: data.text,
                restaurant: id,
                stars: data.stars,
                image,
            })
        );
        if (res.payload) {
            history.push(`/reviews/${res.payload._id}`);
        }
    };

    return (
        <>
            CREating a review for {restaurant.name}
            <Form>
                <Form.Group>
                    <Form.Label>Text</Form.Label>
                    <Form.Control {...register('text', { required: true })} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Stars</Form.Label>
                    <Form.Control {...register('stars', { required: true })} />
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

export default ReviewCreate;
