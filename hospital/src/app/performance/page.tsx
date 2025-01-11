"use client";
import React, { useState, useEffect } from "react";

export default function MealDeliveryStatusPage() {
  const [mealStatusData, setMealStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching meal delivery statuses (in a real-world scenario, fetch from an API)
  useEffect(() => {
    setTimeout(() => {
      setMealStatusData([
        { mealId: 1, patient: "John Doe", status: "Delivered", date: "2025-01-08" },
        { mealId: 2, patient: "Jane Smith", status: "In Progress", date: "2025-01-08" },
        { mealId: 3, patient: "Robert Brown", status: "Pending", date: "2025-01-09" },
        { mealId: 4, patient: "Alice White", status: "Delivered", date: "2025-01-08" },
        { mealId: 5, patient: "Emily Davis", status: "Delivered", date: "2025-01-09" },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading meal delivery status...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-100 text-gray-900">
      {/* Header Navigation */}
      <header className="bg-sky-600 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Meal Delivery Status</h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-sky-600">Meal Delivery Status</h1>
        </header>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <table className="min-w-full mt-4 text-left table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-sky-600">Meal ID</th>
                <th className="px-4 py-2 border-b text-sky-600">Patient</th>
                <th className="px-4 py-2 border-b text-sky-600">Status</th>
                <th className="px-4 py-2 border-b text-sky-600">Delivery Date</th>
              </tr>
            </thead>
            <tbody>
              {mealStatusData.map((meal, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{meal.mealId}</td>
                  <td className="px-4 py-2 border-b">{meal.patient}</td>
                  <td className="px-4 py-2 border-b">{meal.status}</td>
                  <td className="px-4 py-2 border-b">{meal.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
