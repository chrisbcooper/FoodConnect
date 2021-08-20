import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SyncLoader from 'react-spinners/SyncLoader';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { followGroup, loadGroup, unfollowGroup } from '../../redux/groups';

import { Text } from '../../components';
import { deleteGroup } from '../../redux/groups';

const Group = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { group, isLoading, error } = useSelector((state) => state.group);
    const { data, isLoading: isUserLoading } = useSelector((state) => state.user);
    const { id } = useParams();
    let isFollowing = false;

    useEffect(() => {
        dispatch(loadGroup({ id }));
    }, [dispatch, id]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading || isUserLoading || !group.users) {
        <SyncLoader loading={true} size={150} />;
    }

    if (data.groups) {
        isFollowing = group.users.filter((user) => user.user.toString() === data._id).length !== 0;
    }

    return (
        <>
            {group.name}
            <div>{group.users && group.users.length}</div>
            <Button
                onClick={async (event) => {
                    const res = await dispatch(deleteGroup({ id }));
                    if (res.payload) {
                        history.push('/groups');
                    }
                }}
            >
                Delete Group
            </Button>
            {isFollowing ? (
                <Button
                    onClick={async (event) => {
                        dispatch(unfollowGroup({ id }));
                    }}
                >
                    Unfollow
                </Button>
            ) : (
                <Button
                    onClick={async (event) => {
                        dispatch(followGroup({ id }));
                    }}
                >
                    Follow
                </Button>
            )}
        </>
    );
};

export default Group;
