import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function AdminDashboard() {
    // useEffect(() => {
    //     const fetchData=async
    //     const res=await axios.get('')
    // }, [])
    return (
        <section className='mt-20'>
            <div className='flex gap-x-5 font-Roboto font-bold justify-around text-2xl'>
                <div >
                    <h1>Total Students</h1>
                </div>
                <div>
                    <h1>Total Employers</h1>
                </div>
            </div>
        </section>
    )
}
