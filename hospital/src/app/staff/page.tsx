// "use client";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";

// const ManagePantryStaff = () => {
//   // Load staff details from localStorage on initial render
//   const loadStaffDetails = () => {
//     const savedStaffDetails = localStorage.getItem("staffDetails");
//     return savedStaffDetails ? JSON.parse(savedStaffDetails) : { Morning: [], Evening: [], Night: [] };
//   };

//   const [staffDetails, setStaffDetails] = useState(loadStaffDetails);
//   const [newStaff, setNewStaff] = useState({
//     name: "",
//     contact: "",
//     location: "",
//     task: "",
//     shift: "Morning",
//   });

//   // Sync staff details to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("staffDetails", JSON.stringify(staffDetails));
//   }, [staffDetails]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewStaff({ ...newStaff, [name]: value });
//   };

//   const addStaff = (e) => {
//     e.preventDefault();
//     if (newStaff.name && newStaff.contact && newStaff.location && newStaff.task) {
//       setStaffDetails((prev) => ({
//         ...prev,
//         [newStaff.shift]: [...prev[newStaff.shift], newStaff],
//       }));
//       setNewStaff({ name: "", contact: "", location: "", task: "", shift: "Morning" });
//     } else {
//       alert("Please fill out all fields before adding staff!");
//     }
//   };

//   const removeStaff = (shift, index) => {
//     setStaffDetails((prev) => {
//       const updatedShift = prev[shift].filter((_, i) => i !== index);
//       return { ...prev, [shift]: updatedShift };
//     });
//   };

//   return (
//     <div className="min-h-screen bg-sky-100 text-gray-900 p-8">
//       <header className="bg-sky-600 p-4 rounded-lg shadow-md mb-6">
//         <h2 className="text-2xl font-bold text-white">Manage Pantry Staff</h2>
//         <Link href={"/manager"}>Back to home page</Link>
//       </header>

//       <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Form to Add New Staff */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-xl font-bold text-sky-600 mb-4">Add New Staff</h3>
//           <form onSubmit={addStaff}>
//             <label className="block mb-2">
//               Staff Name:
//               <input
//                 type="text"
//                 name="name"
//                 value={newStaff.name}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded-md"
//               />
//             </label>
//             <label className="block mb-2">
//               Contact Info:
//               <input
//                 type="number"
//                 name="contact"
//                 value={newStaff.contact}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded-md"
//               />
//             </label>
//             <label className="block mb-2">
//               Location:
//               <input
//                 type="text"
//                 name="location"
//                 value={newStaff.location}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded-md"
//               />
//             </label>
//             <label className="block mb-2">
//               Task:
//               <input
//                 type="text"
//                 name="task"
//                 value={newStaff.task}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded-md"
//               />
//             </label>
//             <label className="block mb-4">
//               Shift:
//               <select
//                 name="shift"
//                 value={newStaff.shift}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded-md"
//               >
//                 <option value="Morning">Morning</option>
//                 <option value="Evening">Evening</option>
//                 <option value="Night">Night</option>
//               </select>
//             </label>
//             <button
//               type="submit"
//               className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700"
//             >
//               Add Staff
//             </button>
//           </form>
//         </div>

//         {/* Display Staff Details */}
//         <div>
//           {["Morning", "Evening", "Night"].map((shift) => (
//             <div key={shift} className="mb-6">
//               <h3 className="text-xl font-bold text-sky-600 mb-2">{shift} Shift</h3>
//               <div className="bg-white p-4 rounded-lg shadow-md">
//                 {staffDetails[shift].length > 0 ? (
//                   <ul>
//                     {staffDetails[shift].map((staff, index) => (
//                       <li key={index} className="mb-2 border-b pb-2">
//                         <p><strong>Name:</strong> {staff.name}</p>
//                         <p><strong>Contact:</strong> {staff.contact}</p>
//                         <p><strong>Location:</strong> {staff.location}</p>
//                         <p><strong>Task:</strong> {staff.task}</p>
//                         <button
//                           onClick={() => removeStaff(shift, index)}
//                           className="text-red-500 hover:underline text-xs"
//                         >
//                           Remove Staff
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>No staff assigned to this shift.</p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ManagePantryStaff;

"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios"; // Importing axios

const ManagePantryStaff = () => {
  // Load staff details from localStorage on initial render
  const loadStaffDetails = () => {
    const savedStaffDetails = localStorage.getItem("staffDetails");
    return savedStaffDetails
      ? JSON.parse(savedStaffDetails)
      : { Morning: [], Evening: [], Night: [] };
  };

  const [staffDetails, setStaffDetails] = useState(loadStaffDetails);
  const [newStaff, setNewStaff] = useState({
    name: "",
    contact: "",
    location: "",
    task: "",
    shift: "Morning",
  });

  // Sync staff details to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("staffDetails", JSON.stringify(staffDetails));
  }, [staffDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff({ ...newStaff, [name]: value });
  };

  // Adding staff with Axios
  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/staff",
        newStaff
      );
      if (response.status === 201) {
        toast.success("Staff added");
      }
    } catch (error) {
      toast.error("Error in adding staff", error.response || error);
    }
  };

  const removeStaff = (shift, index) => {
    setStaffDetails((prev) => {
      const updatedShift = prev[shift].filter((_, i) => i !== index);
      return { ...prev, [shift]: updatedShift };
    });
  };

  return (
    <div className="min-h-screen bg-sky-100 text-gray-900 p-8">
      <header className="bg-sky-600 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Pantry Staff</h2>
        <Link href={"/manager"}>Back to home page</Link>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form to Add New Staff */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-sky-600 mb-4">Add New Staff</h3>
          <form onSubmit={handleAddStaff}>
            <label className="block mb-2">
              Staff Name:
              <input
                type="text"
                name="name"
                value={newStaff.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </label>
            <label className="block mb-2">
              Contact Info:
              <input
                type="number"
                name="contact"
                value={newStaff.contact}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </label>
            <label className="block mb-2">
              Location:
              <input
                type="text"
                name="location"
                value={newStaff.location}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </label>
            <label className="block mb-2">
              Task:
              <input
                type="text"
                name="task"
                value={newStaff.task}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </label>
            <label className="block mb-4">
              Shift:
              <select
                name="shift"
                value={newStaff.shift}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
            </label>
            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700"
            >
              Add Staff
            </button>
          </form>
        </div>
        {/* Display Staff Details */}
      </main>
      <ToastContainer />
      <button onClick={removeStaff}></button>
    </div>
  );
};

export default ManagePantryStaff;
