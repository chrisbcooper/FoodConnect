import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Container } from 'react-bootstrap';
import FadeIn from 'react-fade-in';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faHeart, faStar, faUtensils } from '@fortawesome/free-solid-svg-icons';

import { loadRestaurants } from '../../redux/restaurants';

import { Loader, Text, GridCard, CardBody, StyledLink, CardImage } from '../../components';

import styled from 'styled-components';

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
        <Container style={{ marginBottom: '30px' }}>
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
                        <GridCard key={index}>
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
                        </GridCard>
                    ))}
            </FadeIn>
        </Container>
    );
};

export default Restaurants;
