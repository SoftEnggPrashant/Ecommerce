import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = (props) => {

    const {user} = useSelector((state) => state.user);

    const {children} = props;
    if(user.role === 'admin'){
        return children;
    }
    else{
        return <Navigate to={'/'} />
    }

}

export default AdminRoute