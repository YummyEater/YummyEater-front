import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({component: Component, logged}) => {
    return (
      logged ? <Navigate to='/' {...alert("로그인 상태에서는 접근할 수 없는 페이지입니다.")} /> : Component
    );
};

export default PublicRoute;