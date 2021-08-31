import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProfile } from '../../redux/profiles';
import { loadUser } from '../../redux/user';
import { Card } from 'react-bootstrap';
import FadeIn from 'react-fade-in';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faHeart, faStar, faUtensils, faUsers, faUser } from '@fortawesome/free-solid-svg-icons';

import { Loader, GridCard, CardBody, StyledLink, CardImage, Stars } from '../../components';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

const FlexDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 30px;
`;

const List = () => {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useSelector((state) => state.user);
    const { profile, isLoading: profileLoading, error: profileError } = useSelector((state) => state.profile);
    const { type, id } = useParams();
    let currUser = false;

    useEffect(() => {
        dispatch(loadProfile({ id }));
        dispatch(loadUser());
    }, [dispatch, id]);

    if (data && data._id === id) {
        currUser = true;
    }

    if (error || profileError) {
        return <text>Error!!</text>;
    } else if (isLoading || profileLoading) {
        return <Loader />;
    }

    const topTextMe = () => {
        if (type === 'posts' || type === 'reviews' || type === 'groups') {
            return `All of my ${type}`;
        }

        if (type === 'visited') {
            return 'All restaurants I have visited';
        }
        if (type === 'wishlist') {
            return 'All restaurants on my wishlist';
        }
    };

    const topTextNotMe = () => {
        if (type === 'posts' || type === 'reviews' || type === 'groups') {
            return `${profile && profile.name}'s ${type}`;
        }

        if (type === 'visited') {
            return `All restaurants ${profile && profile.name} has visited`;
        }
        if (type === 'wishlist') {
            return `All restaurants on ${profile && profile.name}'s wishlist`;
        }
    };

    return (
        <div>
            <FlexDiv>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <h3>{currUser ? topTextMe() : topTextNotMe()}</h3>
                </div>
            </FlexDiv>
            {type === 'groups' && profile.groups && (
                <div style={{ marginTop: 30 }}>
                    <FadeIn childClassName='col' className='row'>
                        {profile.groups.map((item, index) => {
                            return (
                                index < 5 && (
                                    <GridCard key={index}>
                                        <StyledLink to={`/groups/${item.group._id}`}>
                                            {item.group.image ? (
                                                <CardImage variant='top' src={item.group.image} />
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
                                                    <FontAwesomeIcon
                                                        style={{ margin: 'auto' }}
                                                        size={'9x'}
                                                        icon={faUsers}
                                                    />
                                                </div>
                                            )}
                                            <CardBody>
                                                <Card.Title>{item.group.name}</Card.Title>
                                            </CardBody>
                                            <CardBody>
                                                <Card.Text>{item.group.bio}</Card.Text>
                                            </CardBody>
                                        </StyledLink>
                                    </GridCard>
                                )
                            );
                        })}
                    </FadeIn>
                </div>
            )}
            {type === 'posts' && profile.posts && (
                <div style={{ marginTop: 30 }}>
                    <FadeIn childClassName='col' className='row'>
                        {profile.posts.map((item, index) => {
                            return (
                                index < 5 && (
                                    <GridCard key={index}>
                                        <StyledLink to={`/posts/${item.post._id}`}>
                                            {item.post.image ? (
                                                <CardImage variant='top' src={item.post.image} />
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
                                                    <FontAwesomeIcon
                                                        style={{ margin: 'auto' }}
                                                        size={'9x'}
                                                        icon={faUsers}
                                                    />
                                                </div>
                                            )}
                                            <CardBody>
                                                <Card.Text>{item.post.caption}</Card.Text>
                                            </CardBody>
                                        </StyledLink>
                                    </GridCard>
                                )
                            );
                        })}
                    </FadeIn>
                </div>
            )}
            {type === 'visited' && profile.visited_restaurants && (
                <div style={{ marginTop: 30 }}>
                    <FadeIn childClassName='col' className='row'>
                        {profile.visited_restaurants.map((item, index) => {
                            return (
                                index < 5 && (
                                    <GridCard key={index}>
                                        <StyledLink to={`/restaurants/${item.restaurant.yelp_id}`}>
                                            {item.restaurant.photos.length ? (
                                                <CardImage variant='top' src={item.restaurant.photos[0]} />
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
                                                    <FontAwesomeIcon
                                                        style={{ margin: 'auto' }}
                                                        size={'9x'}
                                                        icon={faUsers}
                                                    />
                                                </div>
                                            )}
                                            <CardBody>
                                                <Card.Title>{item.restaurant.name}</Card.Title>
                                            </CardBody>
                                            <div
                                                style={{
                                                    justifyContent: 'space-between',
                                                    flexDirection: 'row',
                                                    display: 'flex',
                                                }}
                                            >
                                                <div style={{ flex: 1 }}>
                                                    {item.restaurant.reviews.length} <FontAwesomeIcon icon={faList} />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    {item.restaurant.likes.length} <FontAwesomeIcon icon={faHeart} />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    {item.restaurant.wishlist.length} <FontAwesomeIcon icon={faStar} />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    {item.restaurant.visited.length}{' '}
                                                    <FontAwesomeIcon icon={faUtensils} />
                                                </div>
                                            </div>
                                        </StyledLink>
                                    </GridCard>
                                )
                            );
                        })}
                    </FadeIn>
                </div>
            )}
            {type === 'wishlist' && profile.wishlist && (
                <div style={{ marginTop: 30 }}>
                    <FadeIn childClassName='col' className='row'>
                        {profile.wishlist.map((item, index) => {
                            return (
                                index < 5 && (
                                    <GridCard key={index}>
                                        <StyledLink to={`/restaurants/${item.restaurant.yelp_id}`}>
                                            {item.restaurant.photos.length ? (
                                                <CardImage variant='top' src={item.restaurant.photos[0]} />
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
                                                    <FontAwesomeIcon
                                                        style={{ margin: 'auto' }}
                                                        size={'9x'}
                                                        icon={faUsers}
                                                    />
                                                </div>
                                            )}
                                            <CardBody>
                                                <Card.Title>{item.restaurant.name}</Card.Title>
                                            </CardBody>
                                            <div
                                                style={{
                                                    justifyContent: 'space-between',
                                                    flexDirection: 'row',
                                                    display: 'flex',
                                                }}
                                            >
                                                <div style={{ flex: 1 }}>
                                                    {item.restaurant.reviews.length} <FontAwesomeIcon icon={faList} />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    {item.restaurant.likes.length} <FontAwesomeIcon icon={faHeart} />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    {item.restaurant.wishlist.length} <FontAwesomeIcon icon={faStar} />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    {item.restaurant.visited.length}{' '}
                                                    <FontAwesomeIcon icon={faUtensils} />
                                                </div>
                                            </div>
                                        </StyledLink>
                                    </GridCard>
                                )
                            );
                        })}
                    </FadeIn>
                </div>
            )}
            {type === 'reviews' && profile.reviews && (
                <div style={{ marginTop: 30 }}>
                    <FadeIn childClassName='col' className='row'>
                        {profile.reviews.map((item, index) => {
                            return (
                                index < 5 && (
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
                                                    <FontAwesomeIcon
                                                        style={{ margin: 'auto' }}
                                                        size={'9x'}
                                                        icon={faUser}
                                                    />
                                                </div>
                                            )}
                                            <CardBody>
                                                <Card.Title>{item.review.text}</Card.Title>
                                            </CardBody>
                                            <CardBody>
                                                <Card.Text>
                                                    <div style={{ textAlign: 'center' }}>
                                                        <Stars stars={item.review.stars} outline />
                                                    </div>
                                                </Card.Text>
                                            </CardBody>
                                        </StyledLink>
                                    </GridCard>
                                )
                            );
                        })}
                    </FadeIn>
                </div>
            )}
        </div>
    );
};

export default List;
