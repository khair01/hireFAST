import React from "react";

export default function JobCard({
  title,
  company,
  location,
  type,
  salary,
  description,
}) {
  return (
    <div className="bg-white shadow-lg rounded-xl border-customPurple p-6 border hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-Montserrat text-customBlack">
          {title}
        </h2>
        <span className="text-sm text-gray-800 bg-gray-100 px-2 py-1 rounded font-Roboto">
          {type}
        </span>
      </div>
      <p className="text-gray-600 mt-2 font-Roboto">{company}</p>
      <p className="text-gray-500">{location}</p>
      <p className="text-green-600 font-medium mt-2 font-Roboto">{salary}</p>
      <p className="text-gray-700 mt-4 text-sm line-clamp-3 font-Roboto">
        {description}
      </p>
      <button className="mt-4 bg-customPurple text-white py-2 px-4 rounded hover:bg-purple-700 font-Lato">
        Apply Now
      </button>
    </div>
  );
}
