import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import ErrorPage from './ErrorPage';

export default function PrivateRoute({children}) {
    const {isLoggedIn} = useSelector((state)=>state?.auth)
    console.log("is logged in?",isLoggedIn)
    if (!isLoggedIn) return <ErrorPage/>;
    return children;
}
