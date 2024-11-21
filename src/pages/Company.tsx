import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Company() {
    return (
        <div className='bg-customWhite min-h-screen'>
            <Navbar />
            <Outlet />
        </div>
    )
}
