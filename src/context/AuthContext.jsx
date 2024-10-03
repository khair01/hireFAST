import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthorized: false,
        role: null,
        loading: true
    });
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const res = await axios.get("http://localhost:8000/protected", {
                    withCredentials: true,
                });
                console.log(res.data); // Handle success
                setAuthState(prev => ({
                    ...prev,
                    role: res.data.role,
                    isAuthorized: true,
                    loading: false
                }));
            } catch (err) {
                console.error(err); // Handle error
                setAuthState(prev => ({
                    role: null,
                    isAuthorized: false,
                    loading: false
                })); // Not authorized
            };
        }

        verifyUser();
    }, []);


    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const { authState, setAuthState } = useContext(AuthContext);
    if (!authState) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return { authState, setAuthState };
}