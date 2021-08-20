import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../../redux/user';

const StyledNavBar = styled(Navbar)`
    background-color: ${(props) => props.theme.dark_blue};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    min-height: 75px;
`;

const NavLink = styled(Link)`
    text-decoration: None;
    color: black;
`;

const N = () => {
    const { isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    return (
        <StyledNavBar collapseOnSelect expand='lg'>
            <Container>
                <Navbar.Brand>
                    <NavLink to='/'>Food Connect</NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                {isAuthenticated && (
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className='mr-auto'>
                            <Nav.Link eventKey={1} as={NavLink} to='/profiles'>
                                Profiles
                            </Nav.Link>
                            <Nav.Link eventKey={1} as={NavLink} to='/explore'>
                                Explore
                            </Nav.Link>
                            <Nav.Link eventKey={1} as={NavLink} to='/groups'>
                                Groups
                            </Nav.Link>
                            <Nav.Link eventKey={1} as={NavLink} to='/restaurants'>
                                Restaurants
                            </Nav.Link>
                            <Nav.Link eventKey={1} as={NavLink} to='/posts'>
                                Posts
                            </Nav.Link>
                            <Nav.Link eventKey={1} as={NavLink} to='/reviews'>
                                Reviews
                            </Nav.Link>
                            <Nav.Link eventKey={1} onClick={(event) => dispatch(logout())}>
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                )}
            </Container>
        </StyledNavBar>
    );
};

export default N;
