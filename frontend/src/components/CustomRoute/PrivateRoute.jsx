import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = (props) => {

    const {isAuthenticate} = useSelector((state) => state.user);
    
    const {children} = props;
    if(isAuthenticate){
        return children;
    }
    else{
        return <Navigate to='/' />
    }
}

export default PrivateRoute