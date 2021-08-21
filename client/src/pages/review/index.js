import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview, likeReview, loadReview, unlikeReview } from '../../redux/reviews';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Text, Loader } from '../../components';
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
    return (
        <div>
            <FlexDiv>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    {review.image && <Image src={review.image} alt='rest' />}
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
