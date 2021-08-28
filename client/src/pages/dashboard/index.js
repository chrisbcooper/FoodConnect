import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/user';
import { Card } from 'react-bootstrap';
import FadeIn from 'react-fade-in';
import { Loader, Text, GridCard, CardBody, StyledLink, CardImage } from '../../components';
import { loadGroups } from '../../redux/groups';
import { loadPosts } from '../../redux/posts';
import { loadRestaurants } from '../../redux/restaurants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faHeart, faStar, faUtensils, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const TopDiv = styled.div`
    justify-content: space-between;
    display: flex;
    margin-top: 20px;
    align-items: center;
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

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user, group, posts, restaurant } = useSelector((state) => state);

    useEffect(() => {
        dispatch(loadUser());
        dispatch(loadGroups());
        dispatch(loadRestaurants({ sort: 'all' }));
        dispatch(loadPosts({ type: 'all' }));
    }, [dispatch]);

    if ((user && user.error) || (posts && posts.error) || (group && group.error) || (restaurant && restaurant.error)) {
        return <Text>Error!!</Text>;
    } else if (
        (user && user.isLoading) ||
        (posts && posts.isLoading) ||
        (group && group.isLoading) ||
        (restaurant && restaurant.isLoading)
    ) {
        return <Loader />;
    }

    return (
        <div>
            <h2 style={{ marginTop: 20, marginBottom: 30 }}>Hello {user.data.name}!</h2>
            <div>
                <div>
                    <TopDiv>
                        <div>
                            <h3>Restaurants</h3>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <LinkP selected to={'/restaurants'}>
                                See All
                            </LinkP>
                        </div>
                    </TopDiv>
                    <FadeIn childClassName='col' className='row'>
                        {restaurant &&
                            restaurant.restaurants &&
                            restaurant.restaurants.map((item, index) => {
                                return index >= 5 ? null : (
                                    <GridCard key={index}>
                                        <StyledLink to={`/restaurants/${item.yelp_id}`}>
                                            {item.photos && <CardImage variant='top' src={item.photos[0]} />}
                                            <CardBody>
                                                <Card.Title>{item.name}</Card.Title>
                                            </CardBody>
                                            <div
                                                style={{
                                                    justifyContent: 'space-between',
                                                    flexDirection: 'row',
                                                    display: 'flex',
                                                }}
                                            >
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
                                );
                            })}
                    </FadeIn>
                    <TopDiv>
                        <div>
                            <h3>Groups</h3>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <LinkP selected to={'/groups'}>
                                See All
                            </LinkP>
                        </div>
                    </TopDiv>
                    <FadeIn childClassName='col' className='row'>
                        {group &&
                            group.groups &&
                            group.groups.map((item, index) => {
                                return index >= 5 ? null : (
                                    <GridCard key={index}>
                                        <StyledLink to={`/groups/${item._id}`}>
                                            {item.image ? (
                                                <CardImage variant='top' src={item.image} />
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
                                                <Card.Title>{item.name}</Card.Title>
                                            </CardBody>
                                            <CardBody>
                                                <Card.Text>{item.bio}</Card.Text>
                                            </CardBody>
                                        </StyledLink>
                                    </GridCard>
                                );
                            })}
                    </FadeIn>
                    <TopDiv>
                        <div>
                            <h3>Posts</h3>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <LinkP selected to={'/posts'}>
                                See All
                            </LinkP>
                        </div>
                    </TopDiv>
                    <FadeIn childClassName='col' className='row'>
                        {posts &&
                            posts.posts &&
                            posts.posts.map((item, index) => {
                                return index >= 5 ? null : (
                                    <GridCard key={index}>
                                        <StyledLink to={`/posts/${item._id}`}>
                                            {item.image && <CardImage variant='top' src={item.image} />}
                                            <CardBody>
                                                <Card.Text>{item.caption}</Card.Text>
                                            </CardBody>
                                        </StyledLink>
                                    </GridCard>
                                );
                            })}
                    </FadeIn>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
