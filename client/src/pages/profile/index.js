import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SyncLoader from 'react-spinners/SyncLoader';
import { followProfile, loadProfile, unfollowProfile } from '../../redux/profiles';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/';
import { Button } from 'react-bootstrap';

const Profile = () => {
    const dispatch = useDispatch();
    const { profile, isLoading, error } = useSelector((state) => state.profile);
    const { data } = useSelector((state) => state.user);
    const { id } = useParams();
    const history = useHistory();
    let currFollowing = false;

    useEffect(() => {
        dispatch(loadProfile({ id }));
    }, [dispatch, id]);

    if (data && data._id === id) {
        history.push('/me');
    }

    if (error) {
        return <text>Error!!</text>;
    } else if (isLoading) {
        <SyncLoader loading={true} size={150} />;
    }

    if (profile.followers && data)
        currFollowing =
            profile.followers.filter((follower) => follower.follower_id.toString() === data._id).length !== 0;

    return (
        <div>
            Profile {profile.name}
            {profile.followers && profile.followers.length}
            {currFollowing ? (
                <Button
                    onClick={async (event) => {
                        dispatch(unfollowProfile({ id }));
                    }}
                >
                    Unfollow
                </Button>
            ) : (
                <Button
                    onClick={async (event) => {
                        dispatch(followProfile({ id }));
                    }}
                >
                    Follow
                </Button>
            )}
        </div>
    );
};

export default Profile;
