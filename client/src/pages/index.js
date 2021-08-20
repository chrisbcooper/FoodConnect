import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { loadUser } from '../redux/user';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from '../components/privateRouter';

import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import { Container } from 'react-bootstrap';
import './index.css';

import Landing from './landing';
import Login from './landing/login';
import Register from './landing/register';
import Dashboard from './dashboard';
import CurrProfile from './profile/currProfile';
import Profile from './profile';
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
import GroupCreate from './groupCreate';
import Profiles from './profiles';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    });

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Navbar />
                <Container style={{ height: '100%', flexGrow: 1, marginBottom: '30px' }}>
                    <Switch>
                        <Route exact path='/' component={Landing} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/register' component={Register} />
                        <PrivateRoute exact path='/dashboard' component={Dashboard} />
                        <PrivateRoute exact path='/me' component={CurrProfile} />
                        <PrivateRoute exact path='/profiles/:id' component={Profile} />
                        <PrivateRoute exact path='/profiles' component={Profiles} />
                        <PrivateRoute exact path='/explore' component={Explore} />
                        <PrivateRoute exact path='/groups' component={Groups} />
                        <PrivateRoute exact path='/groups/create' component={GroupCreate} />
                        <PrivateRoute exact path='/groups/:id' component={Group} />
                        <PrivateRoute exact path='/restaurants' component={Restaurants} />
                        <PrivateRoute exact path='/restaurants/:id' component={Restaurant} />
                        <PrivateRoute exact path='/reviews' component={Reviews} />
                        <PrivateRoute exact path='/reviews/restaurant/:id' component={Reviews} />
                        <PrivateRoute exact path='/reviews/:id' component={Review} />
                        <PrivateRoute exact path='/reviews/restaurant/:id/create' component={ReviewCreate} />
                        <PrivateRoute exact path='/posts/create' component={PostCreate} />
                        <PrivateRoute exact path='/posts/create/:id' component={PostCreate} />
                        <PrivateRoute exact path='/posts' component={Posts} />
                        <PrivateRoute exact path='/posts/:id' component={Post} />
                    </Switch>
                </Container>
            </ThemeProvider>
        </Router>
    );
};

export default App;
