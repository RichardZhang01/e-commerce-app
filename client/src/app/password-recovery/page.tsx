"use client";

import { useState } from "react";
import axios from "axios";

export default function PasswordRecoveryPage() {
  const [email, setEmail] = useState("");

  const handlePasswordRecovery = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5175/api/auth/password-recovery", {
        email,
      });
      console.log(response);
    } catch (error) {
      console.error("Password recovery failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 p-4">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-stone-800 text-center">
        Password Recovery
      </h1>
      <form
        onSubmit={handlePasswordRecovery}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="text-xs md:text-sm lg:text-base w-full mb-4 p-3 border rounded-lg text-stone-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="btn text-xs md:text-sm lg:text-base bg-indigo-600 hover:bg-indigo-700 w-full text-white py-2 rounded-lg transition duration-300 ease-in-out transform active:scale-95"
        >
          Send Recovery Email
        </button>
      </form>
    </div>
  );
}
