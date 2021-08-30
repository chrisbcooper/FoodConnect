import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

import { Text, ImageInput, Loader, Stars } from '../../components';
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
    const [starsTotal, setStarsTotal] = useState(0);

    useEffect(() => {
        dispatch(loadRestaurant({ id }));
    }, [dispatch, id]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        return <Loader />;
    }

    const onSubmit = async (data) => {
        const res = await dispatch(
            reviewCreate({
                text: data.text,
                restaurant: id,
                stars: starsTotal,
                image,
            })
        );
        if (res.payload) {
            history.push(`/reviews/${res.payload._id}`);
        }
    };

    return (
        <>
            <div style={{ textAlign: 'center', marginTop: 10 }}>
                <h3>Creating a review for</h3>
                <h4>{restaurant.name}</h4>
            </div>
            <Form>
                <Form.Group>
                    <Form.Label>Text</Form.Label>
                    <Form.Control {...register('text', { required: true })} />
                </Form.Group>
                <div style={{ height: 20 }} />
                <Form.Group>
                    <Form.Label>Stars</Form.Label>
                    <div>
                        <Stars stars={starsTotal} form={true} setStars={setStarsTotal} />
                    </div>
                </Form.Group>
                <div style={{ height: 20 }} />
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
                    Submit Review
                </SubmitButton>
            </HeaderDiv>
        </>
    );
};

export default ReviewCreate;
