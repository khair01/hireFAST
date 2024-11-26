import React, { useState, useEffect } from "react";
import Navbar from "../components1/navbar.jsx";
import userImage from "../icons/user.png";
import buildingImage from "../icons/building.png";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  "https://naesihwakfonedbaekjq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hZXNpaHdha2ZvbmVkYmFla2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjczMDE1MzgsImV4cCI6MjA0Mjg3NzUzOH0.rXVRyn4ELmyGeeUUFReyHBn8xIL3AI4e9LdckNdaGZ4"
);

export default function AdminDashboard() {
  const [view, setView] = useState("students");
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState([]); // State for students data
  const [companies, setCompanies] = useState([]); // State for companies data
  const itemsPerPage = 10;

  // Fetch data from Supabase when the component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id, first_name, last_name, email"); // Fetch required fields

      if (error) {
        console.error("Error fetching students:", error.message);
      } else {
        setStudents(data);
      }
    };

    const fetchCompanies = async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("id, name, location, employees"); // Fetch required fields

      if (error) {
        console.error("Error fetching companies:", error.message);
      } else {
        setCompanies(data);
      }
    };

    fetchStudents();
    fetchCompanies();
  }, []);

  // Pagination logic
  const data = view === "students" ? students : companies;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen bg-customWhite">
      <Navbar />
      <div className="flex justify-center items-center gap-10 mt-10 py-[150px]">
        <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-8 w-64">
          <img src={userImage} alt="User Icon" className="w-16 h-16" />
          <h2 className="text-customPurple font-Montserrat text-4xl font-bold">
            {students.length} {/* Display number of students */}
          </h2>
          <p className="text-gray-500 text-lg">Students</p>
        </div>

        <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-8 w-64">
          <img src={buildingImage} alt="Building Icon" className="w-16 h-16" />
          <h2 className="text-customPurple font-Montserrat text-4xl font-bold">
            {companies.length} {/* Display number of companies */}
          </h2>
          <p className="text-gray-500 text-lg">Companies</p>
        </div>
      </div>

      <div className="flex justify-start px-[180px] gap-4 mb-6">
        <button
          className={`px-6 py-2 rounded ${
            view === "students"
              ? "bg-customPurple text-customWhite"
              : "bg-gray-200 text-customPurple"
          }`}
          onClick={() => setView("students")}
        >
          Students
        </button>
        <button
          className={`px-6 py-2 rounded ${
            view === "companies"
              ? "bg-customPurple text-customWhite"
              : "bg-gray-200 text-customPurple"
          }`}
          onClick={() => setView("companies")}
        >
          Companies
        </button>
      </div>

      <div className="flex justify-center">
        <table className="w-3/4 bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-customPurple text-white">
            <tr>
              {view === "students" ? (
                <>
                  <th className="py-2 px-4 text-left font-Roboto">ID</th>
                  <th className="py-2 px-4 text-left font-Roboto">Name</th>
                  <th className="py-2 px-4 text-left font-Roboto">Email</th>
                </>
              ) : (
                <>
                  <th className="py-2 px-4 text-left font-Roboto">ID</th>
                  <th className="py-2 px-4 text-left font-Roboto">Name</th>
                  <th className="py-2 px-4 text-left font-Roboto">Location</th>
                  <th className="py-2 px-4 text-left font-Roboto">Employees</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id} className="odd:bg-gray-100">
                <td className="py-2 px-4">{item.id}</td>
                <td className="py-2 px-4">
                  {view === "students"
                    ? `${item.first_name} ${item.last_name}`
                    : item.name}
                </td>
                <td className="py-2 px-4">
                  {view === "students" ? item.email : item.location}
                </td>
                {view === "companies" && (
                  <td className="py-2 px-4">{item.employees}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <button
          className="px-4 py-2 bg-gray-200 text-customPurple rounded font-Lato"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev Page
        </button>
        <button
          className="px-4 py-2 bg-gray-200 text-customPurple rounded font-Lato"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
