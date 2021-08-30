import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followProfile, loadProfile, unfollowProfile } from '../../redux/profiles';
import { Redirect, useParams } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import FadeIn from 'react-fade-in';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faHeart, faStar, faUtensils, faUsers, faUser } from '@fortawesome/free-solid-svg-icons';

import { RoundImage, GhostUser, Loader, GridCard, CardBody, StyledLink, CardImage, Stars } from '../../components';
import styled from 'styled-components';

const TopDiv = styled.div`
    justify-content: space-between;
    display: flex;
    margin-top: 20px;
    align-items: center;
    width: 90%;
`;

// const LinkP = styled(Link)`
//     margin-left: 15px;
//     margin-top: auto;
//     margin-bottom: auto;
//     text-decoration: ${(props) => (props.selected ? 'underline' : 'none')};
//     :hover {
//         color: #ed1212;
//         cursor: pointer;
//     }
// `;

const Profile = () => {
    const dispatch = useDispatch();
    const { profile, isLoading, error } = useSelector((state) => state.profile);
    const { data } = useSelector((state) => state.user);
    const { id } = useParams();
    let currFollowing = false;

    useEffect(() => {
        dispatch(loadProfile({ id }));
    }, [dispatch, id]);

    if (data && data._id === id) {
        return <Redirect to='/me' />;
    }

    if (error) {
        return <text>Error!!</text>;
    } else if (isLoading) {
        return <Loader />;
    }

    if (profile.followers && data)
        currFollowing =
            profile.followers.filter((follower) => follower.follower_id.toString() === data._id).length !== 0;

    return (
        <div style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TopDiv>
                <div style={{ display: 'flex', flexDirection: 'flex-start' }}>
                    {profile.image ? (
                        <RoundImage style={{ marginRight: 25 }} variant={'top'} src={profile.image} />
                    ) : (
                        <GhostUser />
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h2>{profile.name}</h2>
                        <p>{profile.bio || 'bio'}</p>
                        {currFollowing ? (
                            <Button
                                onClick={async (event) => {
                                    dispatch(unfollowProfile({ id }));
                                }}
                            >
                                Unfollow
                            </Button>
                        ) : (
                            <Button
                                onClick={async (event) => {
                                    dispatch(followProfile({ id }));
                                }}
                            >
                                Follow
                            </Button>
                        )}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
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
            {profile.groups && (
                <div style={{ marginTop: 30 }}>
                    <TopDiv>
                        <div>
                            <h3>Groups</h3>
                        </div>
                        {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <LinkP selected to={`/user/${profile._id}/groups`}>
                                See All
                            </LinkP>
                        </div> */}
                    </TopDiv>
                    <FadeIn childClassName='col' className='row'>
                        {profile.groups.map((item, index) => {
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
            {profile.posts && (
                <div style={{ marginTop: 30 }}>
                    <TopDiv>
                        <div>
                            <h3>Posts</h3>
                        </div>
                        {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <LinkP selected to={`/user/${profile._id}/posts`}>
                                See All
                            </LinkP>
                        </div> */}
                    </TopDiv>
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
            {profile.visited_restaurants && (
                <div style={{ marginTop: 30 }}>
                    <TopDiv>
                        <div>
                            <h3>Visited</h3>
                        </div>
                        {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <LinkP selected to={`/user/${profile._id}/reviews`}>
                                See All
                            </LinkP>
                        </div> */}
                    </TopDiv>
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
            {profile.wishlist && (
                <div style={{ marginTop: 30 }}>
                    <TopDiv>
                        <div>
                            <h3>Wishlist</h3>
                        </div>
                        {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <LinkP selected to={`/user/${profile._id}/wishlist`}>
                                See All
                            </LinkP>
                        </div> */}
                    </TopDiv>
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
            {profile.reviews && (
                <div style={{ marginTop: 30 }}>
                    <TopDiv>
                        <div>
                            <h3>Reviews</h3>
                        </div>
                        {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <LinkP selected to={`/user/${profile._id}/reviews`}>
                                See All
                            </LinkP>
                        </div> */}
                    </TopDiv>
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

export default Profile;
