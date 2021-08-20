import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRestaurants } from '../../redux/yelp';
import SyncLoader from 'react-spinners/SyncLoader';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Text } from '../../components';

const Explore = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const { restaurants, isLoading, error } = useSelector((state) => state.yelp);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        <SyncLoader loading={true} size={150} />;
    }

    const onSearch = (data) => {
        dispatch(loadRestaurants({ search: data.text }));
    };

    return (
        <div>
            <Form>
                <Form.Label>Caption Text</Form.Label>
                <Form.Control {...register('text', { required: true })} />
            </Form>
            <Button
                onClick={handleSubmit((data) => {
                    onSearch(data);
                })}
            >
                Search
            </Button>
            {restaurants &&
                restaurants.map((item, index) => {
                    return (
                        <div key={index}>
                            {item.name}
                            <Link to={`/restaurants/${item.id}`}>Go to page</Link>
                        </div>
                    );
                })}
        </div>
    );
};

export default Explore;
