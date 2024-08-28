"use client";

import { useState } from "react";
import axios from "axios";

export default function PasswordRecoveryPage() {
  const [email, setEmail] = useState("");

  const handlePasswordRecovery = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("/api/auth/password-recovery", { email });
      alert("Password recovery instructions have been sent to your email.");
    } catch (error) {
      console.error("Password recovery failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300">
      <h1 className="text-4xl font-extrabold mb-6 text-stone-800">
        Password Recovery
      </h1>
      <form
        onSubmit={handlePasswordRecovery}
        className="bg-white p-8 rounded-lg shadow-lg w-80 max-w-md"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full mb-4 p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          type="submit"
          className="btn bg-yellow-600 hover:bg-yellow-700 w-full"
        >
          Send Recovery Email
        </button>
      </form>
    </div>
  );
}
