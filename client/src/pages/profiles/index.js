import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProfiles } from '../../redux/profiles';
import SyncLoader from 'react-spinners/SyncLoader';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Profiles = () => {
    const { profiles, isLoading, error } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadProfiles());
    }, []);

    if (error) {
        return <text>Error!!</text>;
    } else if (isLoading) {
        <SyncLoader loading={true} size={150} />;
    }

    return (
        <div>
            {profiles &&
                profiles.map((item, index) => (
                    <Card key={index} style={{ width: '18rem' }}>
                        {item.image && <Card.Img variant='top' src={item.image} />}
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>{item.bio}</Card.Text>
                            <Link to={`/profiles/${item._id}`}>Go to {item.name}</Link>
                        </Card.Body>
                    </Card>
                ))}
        </div>
    );
};

export default Profiles;
