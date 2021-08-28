import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/user';
import { Card, Button } from 'react-bootstrap';
import FadeIn from 'react-fade-in';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

import { RoundImage, GhostUser, Loader, GridCard, CardBody, StyledLink, CardImage } from '../../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TopDiv = styled.div`
    justify-content: space-between;
    display: flex;
    margin-top: 20px;
    align-items: center;
    width: 90%;
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
                    </div>
                </div>
            </TopDiv>
            {data.groups && (
                <div style={{ marginTop: 30 }}>
                    <TopDiv>
                        <h1>Groups</h1>
                    </TopDiv>
                    <FadeIn childClassName='col' className='row'>
                        {data.groups.map((item, index) => (
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
