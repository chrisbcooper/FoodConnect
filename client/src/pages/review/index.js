import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview, likeReview, loadReview, unlikeReview } from '../../redux/reviews';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faUser } from '@fortawesome/free-solid-svg-icons';
import { Text, Loader, Stars } from '../../components';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import styled from 'styled-components';

const Image = styled.img`
    height: 300px;
    width: 250px;
    border-radius: 2%;
    margin-bottom: 20px;
`;
const FlexDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 30px;
`;

const Review = () => {
    const dispatch = useDispatch();
    const { review, isLoading, error } = useSelector((state) => state.reviews);
    const { data } = useSelector((state) => state.user);
    let isLiked = false;
    let isCurrUser = false;
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        dispatch(loadReview({ id }));
    }, [dispatch, id]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        return <Loader />;
    }

    if (review.likes && data) {
        isLiked = review.likes.filter((like) => like.like.toString() === data._id).length !== 0;
    }

    if (review.user && data) {
        isCurrUser = review.user === data._id;
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
            <FlexDiv>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    {review.image ? (
                        <Image src={review.image} alt='rest' />
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
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 20,
                        }}
                    >
                        {isLiked ? (
                            <Button
                                onClick={async (event) => {
                                    dispatch(unlikeReview({ id }));
                                }}
                            >
                                Unlike
                            </Button>
                        ) : (
                            <Button
                                onClick={async (event) => {
                                    dispatch(likeReview({ id }));
                                }}
                            >
                                <FontAwesomeIcon style={{ margin: 'auto' }} size={'1x'} icon={faThumbsUp} />
                            </Button>
                        )}
                        <div style={{ width: 10 }} />
                        {review.likes && review.likes.length} likes
                    </div>
                    <Stars stars={review.stars} />
                    <div style={{ height: 15 }} />
                    <p style={{ color: 'grey' }}>
                        Created by {review.user.name} {showDate(review.createdAt)}
                    </p>
                    <p>{review.text}</p>
                </div>
            </FlexDiv>
            {isCurrUser && (
                <Button
                    onClick={async (event) => {
                        const res = await dispatch(deleteReview({ id }));
                        if (res.payload) {
                            history.push('/reviews');
                        }
                    }}
                >
                    Delete Review
                </Button>
            )}
        </div>
    );
};

export default Review;
