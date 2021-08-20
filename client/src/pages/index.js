import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { loadUser } from '../redux/user';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from '../components/privateRouter';

import styled, { ThemeProvider } from 'styled-components';
import theme from '../theme';
import { Container } from 'react-bootstrap';

import Landing from './landing';
import Dashboard from './dashboard';
import Profile from './profile/profile';
import Navbar from './navbar';
import Explore from './explore';
import Groups from './groups';
import Group from './group';
import Restaurant from './restaurant';
import Restaurants from './restaurants';
import Reviews from './reviews';
import Review from './review';
import ReviewCreate from './reviewCreate';
import Posts from './posts';
import Post from './post';
import PostCreate from './postCreate';

const OutsideContainer = styled.div`
    background-color: ${(props) => props.theme.background};
    height: 100%;
    position: absolute;
    width: 100%;
`;

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    });

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Navbar />
                <OutsideContainer>
                    <Container>
                        <Switch>
                            <Route exact path='/' component={Landing} />
                            <PrivateRoute exact path='/dashboard' component={Dashboard} />
                            <PrivateRoute exact path='/profile' component={Profile} />
                            <PrivateRoute exact path='/explore' component={Explore} />
                            <PrivateRoute exact path='/groups' component={Groups} />
                            <PrivateRoute exact path='/group/:id' component={Group} />
                            <PrivateRoute exact path='/restaurants' component={Restaurants} />
                            <PrivateRoute exact path='/restaurants/:id' component={Restaurant} />
                            <PrivateRoute exact path='/reviews/restaurant/:id' component={Reviews} />
                            <PrivateRoute exact path='/reviews/:id' component={Review} />
                            <PrivateRoute exact path='/reviews/restaurant/:id/create' component={ReviewCreate} />
                            <PrivateRoute exact path='/posts' component={Posts} />
                            <PrivateRoute exact path='/posts/:id' component={Post} />
                            <PrivateRoute exact path='/posts/create' component={PostCreate} />
                        </Switch>
                    </Container>
                </OutsideContainer>
            </ThemeProvider>
        </Router>
    );
};

export default App;
