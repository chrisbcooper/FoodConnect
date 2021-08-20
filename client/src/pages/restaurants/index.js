import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faHeart, faStar, faUtensils } from '@fortawesome/free-solid-svg-icons';

import { loadRestaurants } from '../../redux/restaurants';

import { Loader, Text } from '../../components';

import styled from 'styled-components';

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

const TopDiv = styled.div`
    justify-content: space-between;
    display: flex;
    margin-top: 20px;
    align-items: center;
`;

const LinkP = styled.p`
    margin-left: 15px;
    margin-top: auto;
    margin-bottom: auto;
    text-decoration: ${(props) => (props.selected ? 'underline' : 'none')};
    :hover {
        color: #ed1212;
        cursor: pointer;
    }
`;

const Restaurants = () => {
    const dispatch = useDispatch();
    const { restaurants, isLoading, error } = useSelector((state) => state.restaurant);
    const [sortType, setSortType] = useState('likes');

    useEffect(() => {
        dispatch(loadRestaurants({ sort: sortType }));
    }, [dispatch, sortType]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        return <Loader />;
    }

    return (
        <Container>
            <TopDiv>
                <div>
                    <h3>All Restaurants</h3>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LinkP selected={sortType === 'likes'} onClick={(event) => setSortType('likes')}>
                        Likes
                    </LinkP>
                    <LinkP selected={sortType === 'reviews'} onClick={(event) => setSortType('reviews')}>
                        Reviews
                    </LinkP>
                    <LinkP selected={sortType === 'wishlist'} onClick={(event) => setSortType('wishlist')}>
                        Wishlist
                    </LinkP>
                    <LinkP selected={sortType === 'visited'} onClick={(event) => setSortType('visited')}>
                        Visited
                    </LinkP>
                </div>
            </TopDiv>
            <FadeIn childClassName='col' className='row'>
                {restaurants &&
                    restaurants.map((item, index) => (
                        <RestaurantCard key={index}>
                            <StyledLink to={`/restaurants/${item.yelp_id}`}>
                                {item.photos && <CardImage variant='top' src={item.photos[0]} />}
                                <CardBody>
                                    <Card.Title>{item.name}</Card.Title>
                                </CardBody>
                                <div style={{ justifyContent: 'space-between', flexDirection: 'row', display: 'flex' }}>
                                    <div style={{ flex: 1 }}>
                                        {item.reviews.length} <FontAwesomeIcon icon={faList} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        {item.likes.length} <FontAwesomeIcon icon={faHeart} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        {item.wishlist.length} <FontAwesomeIcon icon={faStar} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        {item.visited.length} <FontAwesomeIcon icon={faUtensils} />
                                    </div>
                                </div>
                            </StyledLink>
                        </RestaurantCard>
                    ))}
            </FadeIn>
        </Container>
    );
};

export default Restaurants;
