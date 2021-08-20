import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadReviews } from '../../redux/reviews';
import { Card } from 'react-bootstrap';
import FadeIn from 'react-fade-in';
import { StyledLink, CardBody, GridCard, Loader, Text, CardImage } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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

const Reviews = () => {
    const dispatch = useDispatch();
    const { reviews, isLoading, error } = useSelector((state) => state.reviews);
    const [sortType, setSortType] = useState('all');

    useEffect(() => {
        dispatch(loadReviews({ sort: sortType }));
    }, [dispatch, sortType]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <TopDiv>
                <div>
                    <h3>{sortType === 'all' ? 'All' : 'Following'} Reviews</h3>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LinkP selected={sortType === 'all'} onClick={(event) => setSortType('all')}>
                        All
                    </LinkP>
                    <LinkP selected={sortType === 'following'} onClick={(event) => setSortType('following')}>
                        Following
                    </LinkP>
                </div>
            </TopDiv>
            <FadeIn childClassName='col' child className='row'>
                {reviews &&
                    reviews.map((item, index) => (
                        <GridCard key={index}>
                            <StyledLink to={`/reviews/${item._id}`}>
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
                                        <FontAwesomeIcon style={{ margin: 'auto' }} size={'9x'} icon={faUser} />
                                    </div>
                                )}
                                <CardBody>
                                    <Card.Title>{item.text}</Card.Title>
                                </CardBody>
                                <CardBody>
                                    <Card.Text>{item.stars}</Card.Text>
                                </CardBody>
                            </StyledLink>
                        </GridCard>
                    ))}
            </FadeIn>
        </div>
    );
};

export default Reviews;
