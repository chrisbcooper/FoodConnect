import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/user';
import { Card, Button } from 'react-bootstrap';
import FadeIn from 'react-fade-in';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faHeart, faStar, faUtensils, faUsers, faUser } from '@fortawesome/free-solid-svg-icons';

import { RoundImage, GhostUser, Loader, GridCard, CardBody, StyledLink, CardImage, Stars } from '../../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TopDiv = styled.div`
    justify-content: space-between;
    display: flex;
    margin-top: 20px;
    align-items: center;
    width: 90%;
`;

const LinkP = styled(Link)`
    margin-left: 15px;
    margin-top: auto;
    margin-bottom: auto;
    text-decoration: ${(props) => (props.selected ? 'underline' : 'none')};
    :hover {
        color: #ed1212;
        cursor: pointer;
    }
`;

const Profile = () => {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useSelector((state) => state.user);

    const getUser = useCallback(async () => {
        dispatch(loadUser());
    }, [dispatch]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    if (error) {
        return <text>Error!!</text>;
    } else if (isLoading) {
        return <Loader />;
    }

    return (
        <div style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TopDiv>
                <div style={{ display: 'flex', flexDirection: 'flex-start' }}>
                    {data.image ? (
                        <RoundImage style={{ marginRight: 25 }} variant={'top'} src={data.image} />
                    ) : (
                        <GhostUser />
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h2>{data.name}</h2>
                        <p>{data.bio || 'bio'}</p>
                    </div>
                </div>
                <div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button as={Link} to='/me/edit'>
                            Edit Profile
                        </Button>
                    </div>
                    <div style={{ height: 20 }} />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ textAlign: 'center', marginLeft: 20 }}>
                            <h3>{data.followers && data.followers.length}</h3> <p>Followers</p>
                        </div>
                        <div style={{ textAlign: 'center', marginLeft: 20 }}>
                            <h3>{data.following && data.following.length}</h3> <p>Following</p>
                        </div>
                        <div style={{ textAlign: 'center', marginLeft: 20 }}>
                            <h3>{data.reviews && data.reviews.length}</h3> <p>Reviews</p>
                        </div>
                        <div style={{ textAlign: 'center', marginLeft: 20 }}>
                            <h3>{data.posts && data.posts.length}</h3> <p>Posts</p>
                        </div>
                        <div style={{ textAlign: 'center', marginLeft: 20 }}>
                            <h3>{data.visited_restaurants && data.visited_restaurants.length}</h3> <p>Visited</p>
                        </div>
                        <div style={{ textAlign: 'center', marginLeft: 20 }}>
                            <h3>{data.wishlist && data.wishlist.length}</h3> <p>Wishlist</p>
                        </div>
                    </div>
                </div>
            </TopDiv>
            {data.groups && (
                <div style={{ marginTop: 30 }}>
                    <TopDiv>
                        <div>
                            <h3>Groups</h3>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <LinkP selected to={`/profiles/${data._id}/groups`}>
                                See All
                            </LinkP>
                        </div>
                    </TopDiv>
                    <FadeIn childClassName='col' className='row'>
                        {data.groups.map((item, index) => {
                            return (
                                index < 5 && (
                                    <GridCard key={index}>
                                        <StyledLink to={`groups/${item.group._id}`}>
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
            {data.posts && (
                <div style={{ marginTop: 30 }}>
                    <TopDiv>
                        <div>
                            <h3>Posts</h3>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <LinkP selected to={`/profiles/${data._id}/posts`}>
                                See All
                            </LinkP>
                        </div>
                    </TopDiv>
                    <FadeIn childClassName='col' className='row'>
                        {data.posts.map((item, index) => {
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
            {data.visited_restaurants && (
                <div style={{ marginTop: 30 }}>
                    <TopDiv>
                        <div>
                            <h3>Visited</h3>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <LinkP selected to={`/profiles/${data._id}/visited`}>
                                See All
                            </LinkP>
                        </div>
                    </TopDiv>
                    <FadeIn childClassName='col' className='row'>
                        {data.visited_restaurants.map((item, index) => {
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
            {data.wishlist && (
                <div style={{ marginTop: 30 }}>
                    <TopDiv>
                        <div>
                            <h3>Wishlist</h3>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <LinkP selected to={`/profiles/${data._id}/wishlist`}>
                                See All
                            </LinkP>
                        </div>
                    </TopDiv>
                    <FadeIn childClassName='col' className='row'>
                        {data.wishlist.map((item, index) => {
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
            {data.reviews && (
                <div style={{ marginTop: 30 }}>
                    <TopDiv>
                        <div>
                            <h3>Reviews</h3>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <LinkP selected to={`/profiles/${data._id}/reviews`}>
                                See All
                            </LinkP>
                        </div>
                    </TopDiv>
                    <FadeIn childClassName='col' className='row'>
                        {data.reviews.map((item, index) => {
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

export default Profile;
