import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button as B, Container } from 'react-bootstrap';
import FadeIn from 'react-fade-in';
import { StyledLink, CardBody, GridCard, Loader, Text, CardImage } from '../../components';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import {
    loadRestaurant,
    wishRestaurant,
    unwishRestaurant,
    likeRestaurant,
    unlikeRestaurant,
    visitRestaurant,
    unvisitRestaurant,
} from '../../redux/restaurants';

import styled from 'styled-components';

const Image = styled.img`
    height: 300px;
    width: 200px;
`;

const TopDiv = styled.div`
    justify-content: space-between;
    display: flex;
    margin-top: 20px;
    align-items: center;
`;

const FlexDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 30px;
`;

const Button = styled(B)`
    width: 12rem;
`;

const Restaurant = () => {
    const dispatch = useDispatch();
    const { restaurant, isLoading, error } = useSelector((state) => state.restaurant);
    const { data } = useSelector((state) => state.user);
    const { id } = useParams();
    let wish = false;
    let visited = false;
    let like = false;

    useEffect(() => {
        dispatch(loadRestaurant({ id }));
    }, [dispatch, id]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        return <Loader />;
    }

    if (restaurant.wishlist && data) {
        wish =
            restaurant.wishlist.filter((user) =>
                user.user._id ? user.user._id.toString() === data._id : user.user.toString() === data._id
            ).length !== 0;
    }
    if (restaurant.visited && data) {
        visited = restaurant.visited.filter((user) => user.user.toString() === data._id).length !== 0;
    }
    if (restaurant.likes && data) {
        like = restaurant.likes.filter((user) => user.like.toString() === data._id).length !== 0;
    }
    return (
        <Container>
            <FlexDiv>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <h1>{restaurant.name}</h1>
                    {restaurant.photos && <Image src={restaurant.photos[0]} alt='rest' />}
                </div>
            </FlexDiv>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div
                        style={{
                            width: '12rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginRight: 20,
                        }}
                    >
                        {restaurant.wishlist && restaurant.wishlist.length} wishes
                        {wish ? (
                            <Button
                                onClick={async (event) => {
                                    dispatch(unwishRestaurant({ id }));
                                }}
                            >
                                Unwish
                            </Button>
                        ) : (
                            <Button
                                onClick={async (event) => {
                                    dispatch(wishRestaurant({ id }));
                                }}
                            >
                                Wish
                            </Button>
                        )}
                    </div>
                    <div
                        style={{
                            width: '12rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginRight: 20,
                        }}
                    >
                        {restaurant.visited && restaurant.visited.length} visited
                        {visited ? (
                            <Button
                                onClick={async (event) => {
                                    dispatch(unvisitRestaurant({ id }));
                                }}
                            >
                                Unvisit
                            </Button>
                        ) : (
                            <Button
                                onClick={async (event) => {
                                    dispatch(visitRestaurant({ id }));
                                }}
                            >
                                Visit
                            </Button>
                        )}
                    </div>
                </div>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div
                        style={{
                            width: '12rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginLeft: 20,
                        }}
                    >
                        {restaurant.likes && restaurant.likes.length} visited
                        {like ? (
                            <Button
                                onClick={async (event) => {
                                    dispatch(unlikeRestaurant({ id }));
                                }}
                            >
                                Unlike
                            </Button>
                        ) : (
                            <Button
                                onClick={async (event) => {
                                    dispatch(likeRestaurant({ id }));
                                }}
                            >
                                Like
                            </Button>
                        )}
                        <div
                            style={{
                                width: '12rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            {restaurant.reviews && restaurant.reviews.length}
                            <Button href={`/reviews/restaurant/${id}/create`}>Create a Review</Button>
                        </div>
                    </div>
                </div>
            </div>
            <TopDiv>
                <h3>Reviews</h3>
            </TopDiv>
            <FadeIn childClassName='col' child className='row'>
                {restaurant.reviews &&
                    restaurant.reviews.map((item, index) => (
                        <GridCard key={index}>
                            <StyledLink to={`/reviews/${item.review._id}`}>
                                {item.review.image ? (
                                    <CardImage variant='top' src={item.review.image} />
                                ) : (
                                    <div
                                        style={{
                                            height: '15rem',
                                            width: '15rem',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            display: 'flex',
                                        }}
                                    >
                                        <FontAwesomeIcon style={{ margin: 'auto' }} size={'9x'} icon={faUser} />
                                    </div>
                                )}
                                <CardBody>
                                    <Card.Title>{item.review.text}</Card.Title>
                                </CardBody>
                                <CardBody>
                                    <Card.Text>{item.review.stars}</Card.Text>
                                </CardBody>
                            </StyledLink>
                        </GridCard>
                    ))}
            </FadeIn>
        </Container>
    );
};

export default Restaurant;
