import React from 'react'
import { Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Home from './pages/Home'
import './app.css';
// import { ProtectedRoute } from './Routes/ProtectedRoutes';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <div>
      <AuthProvider>
        <Home />
      </AuthProvider>
    </div>
  )
}
