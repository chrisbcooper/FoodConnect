import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';

import { Text, CardBody, CardImage, GridCard, StyledLink, Loader } from '../../components';
import { loadPosts } from '../../redux/posts';

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

const Posts = () => {
    const dispatch = useDispatch();
    const { posts, isLoading, error } = useSelector((state) => state.posts);
    const [sortType, setSortType] = useState('all');

    useEffect(() => {
        dispatch(loadPosts({ type: sortType }));
    }, [dispatch, sortType]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        return <Loader />;
    }

    const showDate = (date) => {
        const currDate = new Date(date);
        const seconds = Math.floor((new Date() - currDate.getTime()) / 1000);

        let interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + ' years go';
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + ' months ago';
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + ' days ago';
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + ' hours ago';
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + ' minutes ago';
        }
        return Math.floor(seconds) + ' seconds ago';
    };

    return (
        <div>
            <TopDiv>
                <Button as={Link} to='/posts/create'>
                    Create New Post!
                </Button>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LinkP selected={sortType === 'all'} onClick={(event) => setSortType('all')}>
                        All
                    </LinkP>
                    <LinkP selected={sortType === 'following'} onClick={(event) => setSortType('following')}>
                        Following
                    </LinkP>
                </div>
            </TopDiv>
            <FadeIn childClassName='col' className='row'>
                {posts &&
                    posts.map((item, index) => (
                        <GridCard key={index}>
                            <StyledLink to={`/posts/${item._id}`}>
                                {item.image && <CardImage variant='top' src={item.image} />}
                                <CardBody>
                                    <Card.Text>{item.caption}</Card.Text>
                                </CardBody>
                                <CardBody>
                                    <Card.Text>
                                        <p style={{ color: 'grey' }}>
                                            Created by {item.user.name} {showDate(item.createdAt)}
                                        </p>
                                    </Card.Text>
                                </CardBody>
                            </StyledLink>
                        </GridCard>
                    ))}
            </FadeIn>
        </div>
    );
};

export default Posts;
