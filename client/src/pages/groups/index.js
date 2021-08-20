import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import SyncLoader from 'react-spinners/SyncLoader';

import { Text } from '../../components';
import { loadGroups } from '../../redux/groups';

const Groups = () => {
    const dispatch = useDispatch();
    const { groups, isLoading, error } = useSelector((state) => state.group);

    useEffect(() => {
        dispatch(loadGroups());
    }, [dispatch]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        <SyncLoader loading={true} size={150} />;
    }

    return (
        <>
            {groups.map((item, index) => (
                <Card key={index} style={{ width: '18rem' }}>
                    {item.image && <Card.Img variant='top' src={item.image} />}
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>{item.bio}</Card.Text>
                        <Link to={`/groups/${item._id}`}>Go to {item.name}</Link>
                    </Card.Body>
                </Card>
            ))}
            <Link to='/groups/create'>Create Group</Link>
        </>
    );
};

export default Groups;
