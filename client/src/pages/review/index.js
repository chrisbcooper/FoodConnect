import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview, likeReview, loadReview, unlikeReview } from '../../redux/reviews';
import SyncLoader from 'react-spinners/SyncLoader';
import { useParams } from 'react-router-dom';

import { Text } from '../../components';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

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
        <SyncLoader loading={true} size={150} />;
    }

    if (review.likes && data) {
        isLiked = review.likes.filter((like) => like.like.toString() === data._id).length !== 0;
    }

    if (review.user && data) {
        isCurrUser = review.user === data._id;
    }
    return (
        <Text>
            Review {id}
            {isLiked ? (
                <Button
                    onClick={(event) => {
                        dispatch(unlikeReview({ id }));
                    }}
                >
                    Unlike Review
                </Button>
            ) : (
                <Button
                    onClick={(event) => {
                        dispatch(likeReview({ id }));
                    }}
                >
                    Like Review
                </Button>
            )}
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
        </Text>
    );
};

export default Review;
