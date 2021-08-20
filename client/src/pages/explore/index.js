import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRestaurants } from '../../redux/yelp';
import FadeIn from 'react-fade-in';

import { useForm } from 'react-hook-form';
import { Form, Button, Card, Container } from 'react-bootstrap';

import { Text, Loader, CardBody, GridCard, StyledLink, CardImage } from '../../components';

import styled from 'styled-components';

const TotalDiv = styled.div`
    height: 100%;
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
`;

const Explore = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const { restaurants, isLoading, error } = useSelector((state) => state.yelp);

    useEffect(() => {
        dispatch(loadRestaurants({ search: 'restaurants' }));
    }, [dispatch]);

    if (error) {
        return <Text>Error!!</Text>;
    }

    const onSearch = (data) => {
        dispatch(loadRestaurants({ search: data.text }));
    };

    return (
        <TotalDiv>
            <div
                style={{
                    marginTop: 20,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '50%',
                        justifyContent: 'center',
                    }}
                >
                    <Form
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleSubmit(onSearch)();
                        }}
                        style={{ width: '80%' }}
                    >
                        <Form.Control {...register('text', { required: true })} />
                    </Form>
                    <Button
                        onClick={handleSubmit((data) => {
                            onSearch(data);
                        })}
                        style={{ flex: 1, marginLeft: 10 }}
                    >
                        Search
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <Loader />
            ) : (
                <Container>
                    <FadeIn childClassName='col' child className='row'>
                        {restaurants &&
                            restaurants.map((item, index) => (
                                <GridCard key={index}>
                                    <StyledLink to={`/restaurants/${item.id}`}>
                                        {item.image_url && <CardImage variant='top' src={item.image_url} />}
                                        <CardBody>
                                            <Card.Title>{item.name}</Card.Title>
                                        </CardBody>
                                        <CardBody>
                                            <Card.Text>{item.location.city}</Card.Text>
                                        </CardBody>
                                    </StyledLink>
                                </GridCard>
                            ))}
                    </FadeIn>
                </Container>
            )}
        </TotalDiv>
    );
};

export default Explore;
