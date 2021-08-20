import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProfiles } from '../../redux/profiles';
import { Card, Container } from 'react-bootstrap';
import FadeIn from 'react-fade-in';
import { StyledLink, CardBody, RoundImage, TransparentCard, Loader } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import styled from 'styled-components';

const TopDiv = styled.div`
    justify-content: space-between;
    display: flex;
    margin-top: 20px;
    align-items: center;
`;

const LinkP = styled.p`
    margin-left: 15px;
    margin-top: auto;
    margin-bottom: auto;
    text-decoration: ${(props) => (props.selected ? 'underline' : 'none')};
    :hover {
        color: #ed1212;
        cursor: pointer;
    }
`;

const Profiles = () => {
    const { profiles, isLoading, error } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const [sortType, setSortType] = useState('all');

    useEffect(() => {
        dispatch(loadProfiles({ sort: sortType }));
    }, [dispatch, sortType]);

    if (error) {
        return <text>Error!!</text>;
    } else if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <TopDiv>
                <div>
                    <h3>{sortType === 'all' ? 'All' : 'Following'} Profiles</h3>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LinkP selected={sortType === 'all'} onClick={(event) => setSortType('all')}>
                        All
                    </LinkP>
                    <LinkP selected={sortType === 'following'} onClick={(event) => setSortType('following')}>
                        Following
                    </LinkP>
                </div>
            </TopDiv>
            <Container>
                <FadeIn childClassName='col' child className='row'>
                    {profiles &&
                        profiles.map((item, index) => (
                            <TransparentCard key={index}>
                                <StyledLink to={`/profiles/${item._id}`}>
                                    {item.image ? (
                                        <RoundImage variant='top' src={item.image} />
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
                                            <FontAwesomeIcon style={{ margin: 'auto' }} size={'9x'} icon={faUser} />
                                        </div>
                                    )}
                                    <CardBody>
                                        <Card.Title>{item.name}</Card.Title>
                                    </CardBody>
                                    <CardBody>
                                        <Card.Text>{item.bio}</Card.Text>
                                    </CardBody>
                                </StyledLink>
                            </TransparentCard>
                        ))}
                </FadeIn>
            </Container>
        </div>
    );
};

export default Profiles;
