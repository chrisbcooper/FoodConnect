import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPost, deletePost, deleteCommentPost, likePost, unlikePost, commentPost } from '../../redux/posts';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faTrash } from '@fortawesome/free-solid-svg-icons';
import FadeIn from 'react-fade-in';

import { Text, Loader } from '../../components';

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

const Post = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const { post, isLoading, error } = useSelector((state) => state.posts);
    const { data } = useSelector((state) => state.user);
    const [commentForm, setCommentForm] = useState(false);
    const history = useHistory();
    const { id } = useParams();
    let isCurr = false;
    let isLiked = false;

    useEffect(() => {
        dispatch(loadPost({ id }));
    }, [dispatch, id]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        return <Loader />;
    }

    if (data && post) {
        isCurr = data._id === post.user;
    }

    if (post.likes && data) {
        isLiked = post.likes.filter((user) => user.user.toString() === data._id).length !== 0;
    }

    const onSubmitComment = async (data) => {
        const res = await dispatch(commentPost({ id, text: data.text }));
        if (res.payload) {
            setCommentForm(false);
            reset();
        }
    };

    return (
        <div>
            {post && (
                <div>
                    <FlexDiv>
                        <div style={{ textAlign: 'center', marginBottom: 20 }}>
                            {post.image && <Image src={post.image} alt='rest' />}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',

                                    marginBottom: 20,
                                }}
                            >
                                <div>
                                    {isLiked ? (
                                        <Button
                                            onClick={async (event) => {
                                                dispatch(unlikePost({ id }));
                                            }}
                                        >
                                            Unlike
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={async (event) => {
                                                dispatch(likePost({ id }));
                                            }}
                                        >
                                            <FontAwesomeIcon style={{ margin: 'auto' }} size={'1x'} icon={faThumbsUp} />
                                        </Button>
                                    )}
                                    <div style={{ width: 10 }} />
                                    {post.likes && post.likes.length} likes
                                </div>
                                <div>
                                    <Button
                                        onClick={(event) => {
                                            setCommentForm(!commentForm);
                                        }}
                                    >
                                        <FontAwesomeIcon style={{ margin: 'auto' }} size={'1x'} icon={faComment} />
                                    </Button>
                                </div>
                            </div>
                            <p>{post.caption}</p>
                        </div>
                    </FlexDiv>

                    {commentForm && (
                        <div style={{ textAlign: 'center' }}>
                            <Form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    handleSubmit(onSubmitComment)();
                                }}
                            >
                                <Form.Control {...register('text', { required: true })} />
                            </Form>
                            <Button
                                style={{ marginTop: 15 }}
                                onClick={handleSubmit((data) => {
                                    onSubmitComment(data);
                                })}
                            >
                                Create Comment
                            </Button>
                        </div>
                    )}
                    <div style={{ height: 30 }} />
                    <FadeIn>
                        {post.comments &&
                            post.comments.map((item, index) => {
                                return (
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }} key={index}>
                                        {item.text}
                                        {item.user === data._id && (
                                            <Button
                                                onClick={(event) =>
                                                    dispatch(deleteCommentPost({ id, comment_id: item._id }))
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    style={{ margin: 'auto' }}
                                                    size={'1x'}
                                                    icon={faTrash}
                                                />
                                            </Button>
                                        )}
                                    </div>
                                );
                            })}
                    </FadeIn>
                    {isCurr && (
                        <Button
                            onClick={async (event) => {
                                const res = await dispatch(deletePost({ id }));
                                if (res.payload) {
                                    history.push('/posts');
                                }
                            }}
                        >
                            Delete Post
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Post;
