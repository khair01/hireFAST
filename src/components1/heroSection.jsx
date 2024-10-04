import React from "react";

const HeroSection = () => {
    return (
        <div className="text-center py-60 bg-offWhite">
            <span className="mx-auto px-6 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
                Job Hunt !!
            </span>
            <h1 className="text-6xl font-bold mt-4">
                Search, Apply & <br /> Get Your <span className="text-customPurple">Dream Jobs</span>
            </h1>
            <div className="flex justify-center items-center w-full max-w-[600px] mx-auto mt-8 border border-gray-300 rounded-full shadow-lg overflow-hidden">
                <input 
                    type="text" 
                    placeholder="Search Jobs" 
                    className="outline-none border-none w-full py-2 px-4 placeholder-gray-400"
                />
                <button className="bg-customPurple text-white py-2 px-6 rounded-full hover:drop-shadow-lg transition duration-200 ease-in-out">
                    Search
                </button>
            </div>
        </div>
    );
};

export default HeroSection;
