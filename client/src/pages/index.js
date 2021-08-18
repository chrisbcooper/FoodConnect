import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from '../redux/user';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from '../components/privateRouter';

import Landing from './login';
import Dashboard from './dashboard';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    });

    return (
        <Router>
            <Switch>
                <Route path="/login" component={Landing} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
        </Router>
    );
};

export default App;
