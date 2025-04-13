import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Loading from '../../Pages/Loader/Loading';
import { Navigate } from 'react-router';

const PrivetRoute = ({ children }) => {
    const { user, isLoading } = useAuth()
    if (isLoading) {
        return <Loading />
    }
    if (user) {
       return children
    }

    return <Navigate to={`/login`} />

};

export default PrivetRoute;