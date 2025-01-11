"use client";
import React, { useState } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";

const PatientDetailsPage = () => {
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    diseases: "",
    allergies: "",
    roomNumber: "",
    bedNumber: "",
    floorNumber: "",
    age: "",
    gender: "",
    contactInfo: "",
    emergencyContact: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails({ ...patientDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", patientDetails);  // Debugging

    try {
      const response = await fetch("http://localhost:3001/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientDetails),
      });

      console.log("Response:", response);  // Debugging response

      if (response.ok) {
        toast.success("Patient added successfully!");
        // Optional: router.push('/patients'); // Redirect to another page if needed
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to add patient!");
      }
    } catch (error) {
      console.error("Error during adding patient:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-sky-100 text-gray-900">
      <header className="bg-sky-600 p-4">
        <h2 className="text-2xl font-bold text-white">Manage Patient Details</h2>
        <Link
          href={"/manager"}
          className="text-white px-4 py-2 bg-sky-700 rounded-md hover:bg-sky-800"
        >
          Back to home page
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Patient Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={patientDetails.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-1 border rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="diseases"
                className="block text-sm font-medium text-gray-700"
              >
                Diseases
              </label>
              <input
                type="text"
                id="diseases"
                name="diseases"
                value={patientDetails.diseases}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-1 border rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="allergies"
                className="block text-sm font-medium text-gray-700"
              >
                Allergies
              </label>
              <input
                type="text"
                id="allergies"
                name="allergies"
                value={patientDetails.allergies}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-1 border rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="roomNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Room Number
              </label>
              <input
                type="Number"
                id="roomNumber"
                name="roomNumber"
                value={patientDetails.roomNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-1 border rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="bedNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Bed Number
              </label>
              <input
                type="Number"
                id="bedNumber"
                name="bedNumber"
                value={patientDetails.bedNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-1 border rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="floorNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Floor Number
              </label>
              <input
                type="Number"
                id="floorNumber"
                name="floorNumber"
                value={patientDetails.floorNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-1 border rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={patientDetails.age}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-1 border rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={patientDetails.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-1 border rounded-md"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contactInfo"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Information
              </label>
              <input
                type="Number"
                id="contactInfo"
                name="contactInfo"
                value={patientDetails.contactInfo}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-1 border rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="emergencyContact"
                className="block text-sm font-medium text-gray-700"
              >
                Emergency Contact
              </label>
              <input
                type="Number"
                id="emergencyContact"
                name="emergencyContact"
                value={patientDetails.emergencyContact}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-1 border rounded-md"
                required
              />
            </div>
          </div>

          <div className="mt-6 text-right">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-sky-600 rounded-md hover:bg-sky-700"
            >
              Save Details
            </button>
          </div>
        </form>
      </main>
      <ToastContainer/>
    </div>
  );
};

export default PatientDetailsPage;
