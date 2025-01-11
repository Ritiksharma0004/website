"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Make sure you have react-toastify installed
import Link from "next/link";
import { useRouter } from "next/navigation"; 

const StaffDetailPage = () => {
  // Initialize staffDetails as an empty array to ensure it's always an array
  const [staffDetails, setStaffDetails] = useState([]);
  const router = useRouter();

  // Fetch staff details on component mount
  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3001/staffDetail"); // Server endpoint to get staff details

        // Directly set staff details to the response data if it's an array
        setStaffDetails(response.data);
      } catch (error) {
        toast.error("Error fetching staff details");
      }
    };

    fetchStaffDetails();
  }, []);

  const handleRemoveStaff = async (staffId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/staffDetail/${staffId}`, {
        method: "DELETE",
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(data.message); // Display success toast
        // You can refresh the staff list here after deletion
        router.refresh();
      } else {
        toast.error(data.message || "Error deleting staff");
      }
    } catch (error) {
      console.error("Error during staff deletion:", error);
      toast.error("An error occurred while deleting the staff member");
    }
  };
  

  return (
    <div className="min-h-screen bg-sky-100 text-gray-900">
      {/* Header */}
      <header className="bg-sky-600 p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Staff Details</h2>
        <Link href={"/pantry"}>Back to home page</Link>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <h3 className="text-xl font-semibold text-sky-600 mb-6">
          All Staff Members
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {staffDetails.length > 0 ? (
    staffDetails.map((staff) => (
      <div
        key={staff._id}
        className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-2xl font-bold text-sky-800">{staff.name}</h4>
            <p className="text-sm text-gray-500">RJHS ID: {staff._id}</p>
          </div>
          <div className="bg-sky-100 text-sky-800 font-bold py-1 px-3 rounded-full text-xs">
            Staff
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
          <p className="flex items-center">
            <i className="fa-solid fa-phone text-blue-500 mr-2"></i>
            <span>Contact: {staff.contact}</span>
          </p>
          <p className="flex items-center">
            <i className="fa-solid fa-map-marker-alt text-blue-500 mr-2"></i>
            <span>Location: {staff.location}</span>
          </p>
          <p className="flex items-center">
            <i className="fa-solid fa-tasks text-blue-500 mr-2"></i>
            <span>Task: {staff.task}</span>
          </p>
          <p className="flex items-center">
            <i className="fa-solid fa-clock text-blue-500 mr-2"></i>
            <span>Shift: {staff.shift}</span>
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => handleRemoveStaff(staff._id)}
            className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
          >
            Remove
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500 col-span-full">No staff members found add from admin portal.(Login through manager email)</p>
  )}
</div>

      </main>
      <ToastContainer />
    </div>
  );
};

export default StaffDetailPage;


