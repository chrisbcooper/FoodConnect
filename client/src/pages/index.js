import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser, register } from '../redux/user';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    });

    return (
        <div>
            Hello!!!
            <button
                onClick={async (event) => {
                    const res = await dispatch(
                        register({
                            name: 'Christopher',
                            email: '1@2.com',
                            password: 'password',
                        })
                    );
                    const newres = await dispatch(loadUser());
                    console.log(newres);
                }}
            >
                click me
            </button>
        </div>
    );
};

export default App;
