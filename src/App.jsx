import React from 'react'
import { Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Home from './pages/Home'
import './app.css';
import Navbar from './components/Navbar';
// import { ProtectedRoute } from './Routes/ProtectedRoutes';

export default function App() {
  return (
    <div>
      <Navbar />
      <Home />
    </div>
  )
}
