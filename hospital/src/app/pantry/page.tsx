"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Link from "next/link";

const PantryPage = () => {
  // State to manage visibility of sections
  // const [activeSection, setActiveSection] = useState<string | null>(null);

  // Next.js router for redirection
  const router = useRouter();

  // Handle logout and redirect to login page
  const handleLogout = () => {
    console.log("Logged out");
    // Add your actual logout logic here (e.g., clear session, token, etc.)
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-sky-100 text-gray-900">
      {/* Header with Logout Button */}
      <header className="bg-sky-600 p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Pantry Dashboard</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <h3 className="text-xl font-semibold text-sky-600 mb-6">Inner Pantry Dashboard</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* View Delivery Status */}
          <section className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h4 className="text-lg font-bold text-sky-600">
              <Link href="/delivery" className="text-sky-600 hover:underline">
                View Delivery Status
              </Link>
            </h4>
            <p className="text-gray-700 mt-2">
              Track and view delivery statuses and get real-time updates on meal deliveries.
            </p>
                        
          </section>

          {/* Manage Delivery Personnel */}
          <section className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h4 className="text-lg font-bold text-sky-600">
              <Link href="/staffDetail" className="text-sky-600 hover:underline">
                Manage Delivery Personnel
              </Link>
            </h4>
            <p className="text-gray-700 mt-2">
              Manage delivery personnel and assign meal boxes to ensure smooth and timely deliveries.
            </p>
           
          </section>
        </div>
      </main>
    </div>
  );
};

export default PantryPage;
