"use client"
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const loggedIn = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:3001/login", user);
  
      const { email } = response.data;
  
      if (email === "hospital_manager@xyz.com") {
        window.location.href = "/manager";
      } else if (email === "hospital_pantry@xyz.com") {
        window.location.href = "/pantry";
      } else if (email === "hospital_delivery@xyz.com") {
        window.location.href = "/delivery";
      } else {
        setErrorMessage("Unknown user type.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center"
    style={{
      backgroundImage: "url('https://media.gettyimages.com/id/633708091/photo/nurse-carrying-tray-of-food-in-hospital.jpg?s=612x612&w=0&k=20&c=TZY1YKCMXif1Pea-eRRJb9T3_Jfp_8m67JLU7LoX9dg=')",
    }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-green-50 opacity-70 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-green-700">Login</h1>
        <form className="space-y-4" onSubmit={loggedIn}>
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
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Login
          </button>
        </form>
        <div className="flex justify-center items-center">
        <p className="text-black mx-3">Don't have account?</p>
        <Link href={"/signup"} className="text-blue-600">Create Account</Link>
        </div>
      </div>
    </div>
  );
}
