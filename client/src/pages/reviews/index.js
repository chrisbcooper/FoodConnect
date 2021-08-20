import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadReviews } from '../../redux/reviews';
import SyncLoader from 'react-spinners/SyncLoader';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import { Text } from '../../components';

const Reviews = () => {
    const dispatch = useDispatch();
    const { reviews, isLoading, error } = useSelector((state) => state.reviews);

    useEffect(() => {
        dispatch(loadReviews());
    }, [dispatch]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        <SyncLoader loading={true} size={150} />;
    }

    return (
        <div>
            Reviews
            {reviews &&
                reviews.map((item, index) => (
                    <Card key={index} style={{ width: '18rem' }}>
                        {item.image && <Card.Img variant='top' src={item.image} />}
                        <Card.Body>
                            <Card.Title>{item.text}</Card.Title>
                            <Link to={`/reviews/${item._id}`}>Go to {item.name}</Link>
                        </Card.Body>
                    </Card>
                ))}
        </div>
    );
};

export default Reviews;
