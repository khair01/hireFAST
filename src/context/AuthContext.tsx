import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthState = {
  isAuthorized: boolean,
  role: string | null,
  loading: boolean,
}
const AuthContext = createContext<AuthState | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
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
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}