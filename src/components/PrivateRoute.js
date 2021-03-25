import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({component: Component, ...rest}) => (
        <Route {...rest} render={(props) => {
            let response = localStorage.getItem('userInfo');
            console.log(response);
            return response.status === 'connected' ? <Component {...props} /> : <Redirect to="/" />
        }} />

);

export default PrivateRoute;