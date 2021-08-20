import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import groups, { followGroup, loadGroup, unfollowGroup } from '../../redux/groups';

import { RoundImage, Text, GhostUsers, Loader } from '../../components';
import { deleteGroup } from '../../redux/groups';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';
import { Card } from 'react-bootstrap';

import { GridCard, StyledLink, CardImage, CardBody } from '../../components';

const TopDiv = styled.div`
    justify-content: space-between;
    display: flex;
    margin-top: 20px;
    align-items: center;
    width: 90%;
`;

const Group = () => {
    const dispatch = useDispatch();
    const { group, isLoading, error } = useSelector((state) => state.group);
    const { data, isLoading: isUserLoading } = useSelector((state) => state.user);
    const { id } = useParams();
    let isFollowing = false;
    let isCurr = false;

    useEffect(() => {
        dispatch(loadGroup({ id }));
    }, [dispatch, id]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading || isUserLoading || !group.users) {
        return <Loader />;
    }

    if (data.groups && group.users) {
        isFollowing = group.users.filter((user) => user.user.toString() === data._id).length !== 0;
    }

    if (data && group.owner) {
        isCurr = data._id === group.owner;
    }

    return (
        <div style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
            {group.image ? (
                <RoundImage style={{ margin: 'auto' }} src={group.image} />
            ) : (
                <GhostUsers style={{ margin: 'auto' }} />
            )}
            <h2 style={{ marginTop: 20, marginBottom: 20 }}>{group.name}</h2>
            <p style={{ marginTop: 20, marginBottom: 20 }}>{group.bio}</p>
            <div>{group.users && group.users.length} Followers </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '30%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    margin: 'auto',
                }}
            >
                {isFollowing ? (
                    <Button
                        style={{ marginTop: 20, marginBottom: 20 }}
                        onClick={async (event) => {
                            dispatch(unfollowGroup({ id }));
                        }}
                    >
                        Unfollow
                    </Button>
                ) : (
                    <Button
                        style={{ marginTop: 20, marginBottom: 20 }}
                        onClick={async (event) => {
                            dispatch(followGroup({ id }));
                        }}
                    >
                        Follow
                    </Button>
                )}
                <Button style={{ marginBottom: 20 }} as={Link} to={`/posts/create/${id}`}>
                    Create post for group
                </Button>
                {isCurr && (
                    <Button
                        style={{ marginBottom: 20 }}
                        onClick={(event) => {
                            dispatch(deleteGroup({ id }));
                        }}
                    >
                        Delete Group
                    </Button>
                )}
            </div>
            {group.posts && (
                <div>
                    <TopDiv>
                        <h1>Posts</h1>
                    </TopDiv>
                    <FadeIn childClassName='col' className='row'>
                        {group.posts &&
                            group.posts.map((item, index) => (
                                <GridCard key={index}>
                                    <StyledLink to={`/posts/${item.post._id}`}>
                                        {item.post.image && <CardImage variant='top' src={item.post.image} />}
                                        <CardBody>
                                            <Card.Text>{item.post.caption}</Card.Text>
                                        </CardBody>
                                    </StyledLink>
                                </GridCard>
                            ))}
                    </FadeIn>
                </div>
            )}
        </div>
    );
};

export default Group;
