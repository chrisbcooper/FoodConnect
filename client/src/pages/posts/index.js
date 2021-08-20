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
                            </StyledLink>
                        </GridCard>
                    ))}
            </FadeIn>
        </div>
    );
};

export default Posts;
