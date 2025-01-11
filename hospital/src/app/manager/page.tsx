"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";  // Import Link for navigation

export default function ManagerPage() {
  const router = useRouter();

  const handleLogout = () => {
    alert("Logged out successfully!");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-sky-100 text-gray-900">
      {/* Header Navigation */}
      <header className="bg-sky-600 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Hospital Manager</h2>
          <nav className="space-x-6">
            <Link href={"/patient"} className="px-4 py-2 text-white bg-sky-600 hover:bg-sky-700 rounded-md">
              New Patients
            </Link>
            <Link href={"/meal"} className="px-4 py-2 text-white bg-sky-600 hover:bg-sky-700 rounded-md">
              Track Meals
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-sky-600">Manager Dashboard</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/detail">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-bold text-sky-600">Patients Overview</h2>
              <p className="text-gray-600 mt-2">Manage and monitor patient meal schedules and details.</p>
            </div>
          </Link>
          
          <Link href="/meal">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-bold text-sky-600">Diet Management</h2>
              <p className="text-gray-600 mt-2">Create and manage diet plans for patients.</p>
            </div>
          </Link>

          <Link href="/staff">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-sky-600">Staff Task Management</h2>
            <p className="text-gray-600 mt-2">Assign and track staff tasks efficiently.</p>
          </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
