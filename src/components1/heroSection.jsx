import React, { useState } from "react";

const HeroSection = ({ jobData, setJobData, handleSearchChange, searchQuery }) => {


  return (
    <div className="flex justify-center items-center pt-56">
      <div className="text-center py-46 bg-customWhite">
        <span className="mx-auto px-6 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium font-Lato">
          Job Hunt !!
        </span>
        <h1 className="text-6xl font-Montserrat font-bold mt-4">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-customPurple">Dream Jobs</span>
        </h1>
        <div className="flex justify-center items-center w-full max-w-[600px] mx-auto mt-8 border border-gray-300 rounded-full shadow-lg overflow-hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e)}
            placeholder="Search Jobs"
            className="outline-none border-none w-full py-2 px-4 placeholder-gray-400"
          />
          <button className="bg-customPurple text-customWhite py-2 px-6 rounded-full hover:drop-shadow-lg transition duration-200 ease-in-out font-Lato">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
