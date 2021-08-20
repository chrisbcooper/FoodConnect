import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followProfile, loadProfile, unfollowProfile } from '../../redux/profiles';
import { Redirect, useParams } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import FadeIn from 'react-fade-in';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

import { RoundImage, GhostUser, Loader, GridCard, CardBody, StyledLink, CardImage } from '../../components';
import styled from 'styled-components';

const TopDiv = styled.div`
    justify-content: space-between;
    display: flex;
    margin-top: 20px;
    align-items: center;
    width: 90%;
`;

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
                    <div style={{ textAlign: 'center', marginLeft: 20 }}>
                        <h3>{profile.followers.length}</h3> <p>Followers</p>
                    </div>
                    <div style={{ textAlign: 'center', marginLeft: 20 }}>
                        <h3>{profile.following.length}</h3> <p>Following</p>
                    </div>
                    <div style={{ textAlign: 'center', marginLeft: 20 }}>
                        <h3>{profile.reviews.length}</h3> <p>Reviews</p>
                    </div>
                    <div style={{ textAlign: 'center', marginLeft: 20 }}>
                        <h3>{profile.posts.length}</h3> <p>Posts</p>
                    </div>
                    <div style={{ textAlign: 'center', marginLeft: 20 }}>
                        <h3>{profile.visited_restaurants.length}</h3> <p>Visited</p>
                    </div>
                </div>
            </TopDiv>
            {profile.groups && (
                <div style={{ marginTop: 30 }}>
                    <TopDiv>
                        <h1>Groups</h1>
                    </TopDiv>
                    <FadeIn childClassName='col' className='row'>
                        {profile.groups.map((item, index) => (
                            <GridCard key={index}>
                                <StyledLink to={`/groups/${item.group_id}`}>
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
                                            <FontAwesomeIcon style={{ margin: 'auto' }} size={'9x'} icon={faUsers} />
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
                        ))}
                    </FadeIn>
                </div>
            )}
        </div>
    );
};

export default Profile;
