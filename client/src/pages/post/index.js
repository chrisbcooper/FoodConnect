import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPost, deletePost, deleteCommentPost, likePost, unlikePost, commentPost } from '../../redux/posts';
import SyncLoader from 'react-spinners/SyncLoader';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { Text } from '../../components';

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
        <SyncLoader loading={true} size={150} />;
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
                    {post.caption}
                    {post.likes && post.likes.length}
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
                            Like
                        </Button>
                    )}
                    {commentForm ? (
                        <>
                            <Form>
                                <Form.Label>Caption Text</Form.Label>
                                <Form.Control {...register('text', { required: true })} />
                            </Form>
                            <Button
                                onClick={handleSubmit((data) => {
                                    onSubmitComment(data);
                                })}
                            >
                                Create Comment
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={(event) => {
                                setCommentForm(true);
                            }}
                        >
                            Add Comment
                        </Button>
                    )}
                    {post.comments &&
                        post.comments.map((item, index) => {
                            return (
                                <div key={index}>
                                    {item.user === data._id && (
                                        <Button
                                            onClick={(event) =>
                                                dispatch(deleteCommentPost({ id, comment_id: item._id }))
                                            }
                                        >
                                            Delete comment
                                        </Button>
                                    )}
                                    {item.text}
                                </div>
                            );
                        })}
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
