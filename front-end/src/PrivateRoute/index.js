import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import ajax from '../services/fetchService';

const PrivateRoute = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if(token) {
            ajax(`/api/auth/validate?token=${token}`, "get",token).then(response => {
                setIsLoading(false);
                setIsValid(response);
            });
        } else {
            setIsLoading(false);
        }
    }, []);

    if(isLoading) {
        return <div>Loading...</div>; // Or some loading spinner
    } else if(isValid) {
        return children;
    } else {
        return <Navigate to="/login"/>;
    }
};

export default PrivateRoute;
