import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({component: Component, logged}) => {
    console.log(logged)
    return (
        logged ? Component : <Navigate to='/login' {...alert("로그인 후 접근 가능한 페이지입니다.")} />
    );
};

export default PrivateRoute;