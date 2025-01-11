
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";

const DeliveryStatusPage = () => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/staffDetail");
      setDeliveries(response.data);
    } catch (error) {
      toast.error("Failed to fetch delivery data."+ error);
    }
  };

  const handleMarkAsCompleted = async (id) => {
    try {
      const updatedDeliveries = deliveries.filter((delivery) => delivery._id !== id);
      setDeliveries(updatedDeliveries);

      await axios.delete(`http://localhost:3001/staffDetail/${id}`);

      toast.success("Delivery marked as completed and removed!");
    } catch (error) {
      console.log(error)
      toast.error("Error marking delivery as completed.");
    }
  };

  return (
    <div className="min-h-screen bg-sky-100 text-gray-900 p-8">
      <header className="bg-sky-600 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-white">Delivery Status</h2>
        <Link href={"/pantry"} className="text-white px-4 py-2 bg-sky-700 rounded-md hover:bg-sky-800">
          Back to home page
        </Link>
      </header>

      <main>
        <h3 className="text-lg font-bold text-sky-600 mb-6">Manage Delivery Status</h3>

        <table className="min-w-full bg-white rounded-lg shadow-md text-center">
          <thead>
            <tr className="bg-sky-600 text-white">
              <th className="px-4 py-2 border-b">Order ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Shift</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery._id}>
                <td className="px-4 py-2 border-b">{delivery._id}</td>
                <td className="px-4 py-2 border-b">{delivery.name}</td>
                <td className="px-4 py-2 border-b">{delivery.shift}</td>
                <td className="px-4 py-2 border-b">
                  {delivery.shift !== "" && (
                    <button
                      onClick={() => handleMarkAsCompleted(delivery._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Mark as Completed
                    </button>
                  )}
                  {delivery.status === "Completed" && (
                    <span className="text-green-500">✔️</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <ToastContainer />
    </div>
  );
};

export default DeliveryStatusPage;
