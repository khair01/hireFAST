import React, { useState } from "react";
import Navbar from "../components1/navbar.jsx";
import JobCard from "../components1/jobcard.jsx";
import userImage from "../icons/user.png";
import buildingImage from "../icons/building.png";

export default function AdminDashboard() {
  const [view, setView] = useState("students");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const students = [
    { id: 1, name: "Ali Khan", email: "ali.khan@example.com", age: 21 },
    { id: 2, name: "Sara Ahmed", email: "sara.ahmed@example.com", age: 22 },
    { id: 3, name: "Bilal Ali", email: "bilal.ali@example.com", age: 20 },
    { id: 4, name: "Fatima Noor", email: "fatima.noor@example.com", age: 23 },
    { id: 5, name: "Hamza Tariq", email: "hamza.tariq@example.com", age: 22 },
    {
      id: 6,
      name: "Ayesha Siddiqui",
      email: "ayesha.siddiqui@example.com",
      age: 21,
    },
    { id: 7, name: "Usman Raza", email: "usman.raza@example.com", age: 24 },
    { id: 8, name: "Zara Malik", email: "zara.malik@example.com", age: 20 },
    {
      id: 9,
      name: "Yasir Qureshi",
      email: "yasir.qureshi@example.com",
      age: 23,
    },
    { id: 10, name: "Maha Hassan", email: "maha.hassan@example.com", age: 22 },
    { id: 11, name: "Nida Khan", email: "nida.khan@example.com", age: 21 },
    { id: 12, name: "Taha Sheikh", email: "taha.sheikh@example.com", age: 23 },
    { id: 13, name: "Hiba Saeed", email: "hiba.saeed@example.com", age: 22 },
    { id: 14, name: "Ahmed Javed", email: "ahmed.javed@example.com", age: 20 },
    { id: 15, name: "Sana Khalid", email: "sana.khalid@example.com", age: 24 },
    { id: 16, name: "Rayan Mir", email: "rayan.mir@example.com", age: 22 },
    { id: 17, name: "Farah Shah", email: "farah.shah@example.com", age: 21 },
    { id: 18, name: "Hassan Ali", email: "hassan.ali@example.com", age: 23 },
    { id: 19, name: "Komal Abbas", email: "komal.abbas@example.com", age: 22 },
    { id: 20, name: "Saad Iqbal", email: "saad.iqbal@example.com", age: 21 },
  ];

  const companies = [
    { id: 1, name: "Tech Corp", location: "San Francisco", employees: 500 },
    { id: 2, name: "Innovate Ltd", location: "New York", employees: 300 },
    /* Add more companies to test pagination */
  ];

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
            42
          </h2>
          <p className="text-gray-500 text-lg">Students</p>
        </div>

        <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-8 w-64">
          <img src={buildingImage} alt="Building Icon" className="w-16 h-16" />
          <h2 className="text-customPurple font-Montserrat text-4xl font-bold">
            67
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
                  <th className="py-2 px-4 text-left font-Roboto">Age</th>
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
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">
                  {view === "students" ? item.email : item.location}
                </td>
                <td className="py-2 px-4">
                  {view === "students" ? item.age : item.employees}
                </td>
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
