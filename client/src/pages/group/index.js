import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SyncLoader from 'react-spinners/SyncLoader';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { loadGroup } from '../../redux/groups';

import { Text } from '../../components';
import { deleteGroup } from '../../redux/groups';

const Group = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isLoading, error } = useSelector((state) => state.group);
    const { id } = useParams();

    useEffect(() => {
        dispatch(loadGroup({ id }));
    }, [dispatch, id]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        <SyncLoader loading={true} size={150} />;
    }

    return (
        <>
            Group {id}
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
        </>
    );
};

export default Group;
