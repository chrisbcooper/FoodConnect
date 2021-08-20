import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SyncLoader from 'react-spinners/SyncLoader';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Text } from '../../components';
import { loadPosts } from '../../redux/posts';

const Posts = () => {
    const dispatch = useDispatch();
    const { posts, isLoading, error } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(loadPosts());
    }, [dispatch]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        <SyncLoader loading={true} size={150} />;
    }

    return (
        <div>
            <Link to='/posts/create'>Create Post </Link>
            {posts.map((item, index) => (
                <Card key={index} style={{ width: '18rem' }}>
                    {item.image && <Card.Img variant='top' src={item.image} />}
                    <Card.Body>
                        <Card.Title>{item.caption}</Card.Title>
                        <Link to={`/posts/${item._id}`}>Go to {item.name}</Link>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default Posts;
