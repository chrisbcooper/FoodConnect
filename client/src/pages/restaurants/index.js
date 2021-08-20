import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SyncLoader from 'react-spinners/SyncLoader';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { loadRestaurants } from '../../redux/restaurants';

import { Text } from '../../components';

const Restaurants = () => {
    const dispatch = useDispatch();
    const { restaurants, isLoading, error } = useSelector((state) => state.restaurant);

    useEffect(() => {
        dispatch(loadRestaurants());
    }, [dispatch]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        <SyncLoader loading={true} size={150} />;
    }

    return (
        <div>
            {restaurants &&
                restaurants.map((item, index) => (
                    <Card key={index} style={{ width: '18rem' }}>
                        {item.photos && <Card.Img variant='top' src={item.photos[0]} />}
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>{item.bio}</Card.Text>
                            <Link to={`/restaurants/${item.yelp_id}`}>Go to {item.name}</Link>
                        </Card.Body>
                    </Card>
                ))}
        </div>
    );
};

export default Restaurants;
