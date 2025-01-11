// "use client";
// import React, { useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify"; // For displaying success or error messages
// import Link from "next/link"; // For navigating between pages

// const PatientDetailPage = () => {
//   const [patients, setPatients] = useState([]); // State to store patient details
//   const [loading, setLoading] = useState(true); // State to track loading status

//   // Fetch patient details from the API
//   useEffect(() => {
//     const fetchPatientDetails = async () => {
//       try {
//         const response = await fetch("http://localhost:3001/patient/detail"); // Assuming your backend is running on localhost:3001
//         if (response.ok) {
//           const data = await response.json();
//           setPatients(data); // Set the fetched patient data in state
//           setLoading(false); // Set loading to false once data is fetched
//         } else {
//           toast.error("Failed to fetch patient details!");
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error("Error fetching patient details:", error);
//         toast.error("An error occurred while fetching patient details!");
//         setLoading(false);
//       }
//     };

//     fetchPatientDetails(); // Call the function to fetch patient data
//   }, []); // Empty dependency array ensures the effect runs once on mount

//   // Delete a patient
//   const handleDelete = async (id) => {
//     console.log("Deleting patient with ID:", id); // Log the ID being sent
  
//     const confirmed = window.confirm("Are you sure you want to delete this patient?");
//     if (confirmed) {
//       try {
//         const response = await fetch(`http://localhost:3001/details/${id}`, {
//           method: "DELETE",
//         });
  
//         if (response.ok) {
//           setPatients((prevPatients) => prevPatients.filter((patient) => patient._id !== id));
//           toast.success("Patient deleted successfully!");
//         } else {
//           toast.error("Failed to delete patient.");
//         }
//       } catch (error) {
//         console.error("Error deleting patient:", error);
//         toast.error("An error occurred while deleting the patient.");
//       }
//     }
//   };
  
  

//   if (loading) {
//     return <div>Loading patient details...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-sky-100 text-gray-900">
//       <header className="bg-sky-600 p-4">
//         <h2 className="text-2xl font-bold text-white">Patient Overview</h2>
//         <Link href={"/manager"} className="text-white px-4 py-2 bg-sky-700 rounded-md hover:bg-sky-800">
//           Back to home page
//         </Link>
//       </header>

//       <main className="flex-1 p-8">
//         <div className="overflow-x-auto">
//           <table className="table-auto w-full bg-white rounded-lg shadow-md border-collapse">
//             <thead>
//               <tr className="bg-sky-600 text-white">
//                 <th className="px-4 py-2 border border-sky-500 text-center">Patient Name</th>
//                 <th className="px-4 py-2 border border-sky-500 text-center">Patient Id</th>
//                 <th className="px-4 py-2 border border-sky-500 text-center">Disease</th>
//                 <th className="px-4 py-2 border border-sky-500 text-center">Room Number</th>
//                 <th className="px-4 py-2 border border-sky-500 text-center">Bed Number</th>
//                 <th className="px-4 py-2 border border-sky-500 text-center">Gender</th>
//                 <th className="px-4 py-2 border border-sky-500 text-center">Actions</th> 
//               </tr>
//             </thead>
//             <tbody>
//               {patients.length > 0 ? (
//                 patients.map((patient) => (
//                   <tr key={patient._id} className="hover:bg-sky-100">
//                     <td className="px-4 py-2 border border-sky-500 text-center">{patient.name}</td>
//                     <td className="px-4 py-2 border border-sky-500 text-center">{patient._id}</td>
//                     <td className="px-4 py-2 border border-sky-500 text-center">{patient.diseases}</td>
//                     <td className="px-4 py-2 border border-sky-500 text-center">{patient.roomNumber}</td>
//                     <td className="px-4 py-2 border border-sky-500 text-center">{patient.bedNumber}</td>
//                     <td className="px-4 py-2 border border-sky-500 text-center">{patient.gender}</td>
//                     <td className="px-4 py-2 border border-sky-500 text-center">
//                       <button
//                         onClick={() => handleDelete(patient._id)} 
//                         className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="px-4 py-2 text-center">No patient data available</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>
//       <ToastContainer/>
//     </div>
//   );
// };

// export default PatientDetailPage;




"use client";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";

const PatientDetailPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch("http://localhost:3001/patient/detail");
        if (response.ok) {
          const data = await response.json();
          setPatients(data);
          setLoading(false);
        } else {
          toast.error("Failed to fetch patient details!");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
        toast.error("An error occurred while fetching patient details!");
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, []);

  const handleDelete = async (id) => {
    console.log("Deleting patient with ID:", id);

    const confirmed = window.confirm("Are you sure you want to delete this patient?");
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:3001/details/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setPatients((prevPatients) => prevPatients.filter((patient) => patient._id !== id));
          toast.success("Patient deleted successfully!");
        } else {
          toast.error("Failed to delete patient.");
        }
      } catch (error) {
        console.error("Error deleting patient:", error);
        toast.error("An error occurred while deleting the patient.");
      }
    }
  };

  if (loading) {
    return <div>Loading patient details...</div>;
  }

  return (
    <div className="min-h-screen bg-sky-100 text-gray-900">
      <header className="bg-sky-600 p-4">
        <h2 className="text-2xl font-bold text-white">Patient Overview</h2>
        <Link href={"/manager"} className="text-white px-4 py-2 bg-sky-700 rounded-md hover:bg-sky-800">
          Back to home page
        </Link>
      </header>

      <main className="flex-1 p-8">
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white rounded-lg shadow-md border-collapse">
            <thead>
              <tr className="bg-sky-600 text-white">
                <th className="px-4 py-2 border border-sky-500 text-center">Patient Name</th>
                <th className="px-4 py-2 border border-sky-500 text-center">Patient Id</th>
                <th className="px-4 py-2 border border-sky-500 text-center">Disease</th>
                <th className="px-4 py-2 border border-sky-500 text-center">Room Number</th>
                <th className="px-4 py-2 border border-sky-500 text-center">Bed Number</th>
                <th className="px-4 py-2 border border-sky-500 text-center">Gender</th>
                <th className="px-4 py-2 border border-sky-500 text-center">Actions</th> 
              </tr>
            </thead>
            <tbody>
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <tr key={patient._id} className="hover:bg-sky-100">
                    <td className="px-4 py-2 border border-sky-500 text-center">{patient.name}</td>
                    <td className="px-4 py-2 border border-sky-500 text-center">{patient._id}</td>
                    <td className="px-4 py-2 border border-sky-500 text-center">{patient.diseases}</td>
                    <td className="px-4 py-2 border border-sky-500 text-center">{patient.roomNumber}</td>
                    <td className="px-4 py-2 border border-sky-500 text-center">{patient.bedNumber}</td>
                    <td className="px-4 py-2 border border-sky-500 text-center">{patient.gender}</td>
                    <td className="px-4 py-2 border border-sky-500 text-center">
                      <button
                        onClick={() => handleDelete(patient._id)} 
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-2 text-center">No patient data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <ToastContainer/>
    </div>
  );
};

export default PatientDetailPage;
