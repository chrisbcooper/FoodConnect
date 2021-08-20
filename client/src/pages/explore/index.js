import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRestaurants } from '../../redux/yelp';
import FadeIn from 'react-fade-in';

import { useForm } from 'react-hook-form';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Text, Loader } from '../../components';

import styled from 'styled-components';

const TotalDiv = styled.div`
    height: 100%;
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
`;

const CardImage = styled(Card.Img)`
    height: 15rem;
    width: 15rem;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
`;

const CardBody = styled(Card.Body)`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-align: center;
    padding: 0;
    margin: 1rem 1rem;
`;

const RestaurantCard = styled(Card)`
    width: 15rem;
    height: 21rem;
    margin: auto;
    -moz-box-shadow: 0 0 3px #ccc;
    -webkit-box-shadow: 0 0 3px #ccc;
    box-shadow: 0 0 3px #ccc;
`;
const Explore = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const { restaurants, isLoading, error } = useSelector((state) => state.yelp);

    if (error) {
        return <Text>Error!!</Text>;
    }

    const onSearch = (data) => {
        dispatch(loadRestaurants({ search: data.text }));
    };

    return (
        <TotalDiv>
            <Form
                onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit((data) => {
                        onSearch(data);
                    });
                }}
            >
                <Form.Label>Caption Text</Form.Label>
                <Form.Control {...register('text', { required: true })} />{' '}
                <Button
                    onClick={handleSubmit((data) => {
                        onSearch(data);
                    })}
                >
                    Search
                </Button>
            </Form>

            {isLoading ? (
                <Loader />
            ) : (
                <Container>
                    <FadeIn childClassName='col' child className='row'>
                        {restaurants &&
                            restaurants.map((item, index) => (
                                <RestaurantCard key={index}>
                                    <StyledLink to={`/restaurants/${item.id}`}>
                                        {item.image_url && <CardImage variant='top' src={item.image_url} />}
                                        <CardBody>
                                            <Card.Title>{item.name}</Card.Title>
                                        </CardBody>
                                    </StyledLink>
                                </RestaurantCard>
                            ))}
                    </FadeIn>
                </Container>
            )}
        </TotalDiv>
    );
};

export default Explore;
