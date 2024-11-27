import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
export default function Signout({ signUpButtonColor }) {
    const navigate = useNavigate();
    const { setAuthState } = useAuth();
    const handleSignOut = async () => {
        console.log('hello');
        try {
            const res = await axios.post('http://localhost:8000/user/logout', {}, { withCredentials: true });
            console.log(res.data);
            setAuthState({
                role: null,
                isAuthorized: false,
                loading: false
            })
            navigate('/');
        }
        catch (err) {
            console.log("error signing out");
        }
    }
    return (
        <button onClick={handleSignOut}
            className={`px-4 py-2 rounded-full hover:drop-shadow-l font-lato ${signUpButtonColor}`}>
            Sign Out
        </button>
    )
}
