import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import FadeIn from 'react-fade-in';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

import { Text, Loader, GridCard, CardBody, StyledLink, CardImage } from '../../components';
import { loadGroups } from '../../redux/groups';

import styled from 'styled-components';

const TopDiv = styled.div`
    justify-content: flex-end;
    display: flex;
    margin-top: 20px;
    align-items: center;
`;

const Groups = () => {
    const dispatch = useDispatch();
    const { groups, isLoading, error } = useSelector((state) => state.group);

    useEffect(() => {
        dispatch(loadGroups());
    }, [dispatch]);

    if (error) {
        return <Text>Error!!</Text>;
    } else if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <TopDiv>
                <Button as={Link} to='/groups/create'>
                    Create New Group!
                </Button>
            </TopDiv>
            <FadeIn childClassName='col' className='row'>
                {groups &&
                    groups.map((item, index) => (
                        <GridCard key={index}>
                            <StyledLink to={`/groups/${item._id}`}>
                                {item.image ? (
                                    <CardImage variant='top' src={item.image} />
                                ) : (
                                    <div
                                        style={{
                                            height: '15rem',
                                            width: '15rem',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            display: 'flex',
                                        }}
                                    >
                                        <FontAwesomeIcon style={{ margin: 'auto' }} size={'9x'} icon={faUsers} />
                                    </div>
                                )}
                                <CardBody>
                                    <Card.Title>{item.name}</Card.Title>
                                </CardBody>
                                <CardBody>
                                    <Card.Text>{item.bio}</Card.Text>
                                </CardBody>
                            </StyledLink>
                        </GridCard>
                    ))}
            </FadeIn>
        </>
    );
};

export default Groups;
