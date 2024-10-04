import React from 'react';
import Navbar from '../components1/navbar.jsx';
import HeroSection from '../components1/heroSection.jsx';

const ApplyJobs = () => {
  return (
    <div className='min-h-screen bg-customWhite justify-center text-center '>
        <div className='py-30 px-10'>
            <Navbar />
        </div>
        
        <HeroSection />
    </div>
  );
};

export default ApplyJobs;
