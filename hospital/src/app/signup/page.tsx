"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to the backend
      const response = await axios.post("http://localhost:3001/signup", user);
      toast.success(response.data.message || "Account created successfully!");
    } catch (error) {
      console.log(error)
      toast.error("User already exists")
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://media.gettyimages.com/id/1394668641/photo/nurse-using-digital-banking.jpg?s=612x612&w=0&k=20&c=L1wG16IT_hsPYzMYFkIKm0kr2Sm-0GmJIha9Kitvuok=')",
      }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-green-50 opacity-70 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-green-700">Signup</h1>
        <form className="space-y-4" onSubmit={handleSignup}>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-green-800">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-2 mt-1 border rounded-md text-black"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-green-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full px-4 py-2 mt-1 border rounded-md text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Signup
          </button>
        </form>
        <div className="flex justify-center items-center">
          <p className="text-black mx-3">Already have an account?</p>
          <Link href={"/login"} className="text-blue-600">Login</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
