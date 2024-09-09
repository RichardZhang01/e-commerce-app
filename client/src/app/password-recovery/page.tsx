"use client";

import { useState } from "react";
import axios from "axios";
import AlertBox from "../../components/AlertBox"; // Import AlertBox

export default function PasswordRecoveryPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [httpError, setHttpError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordRecovery = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
      return;
    }

    try {
      await axios.post("http://localhost:5175/api/auth/password-recovery", {
        email,
      });
      setSuccess(
        "Password recovery email has been sent. Please check your inbox."
      );
      setError("");
    } catch (error: any) {
      if (error.response) {
        setHttpError(
          error.response?.data ||
            "Password recovery request failed. Please try again later."
        );
      } else {
        setHttpError(
          "Network error. There may be an issue with our servers or your connection. Please try again later."
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 p-4">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-stone-800 text-center">
        Recover Password
      </h1>

      {httpError && (
        <AlertBox
          message={httpError}
          type="error"
          onClose={() => setHttpError("")}
        />
      )}
      {success && (
        <AlertBox
          message={success}
          type="success"
          onClose={() => setSuccess("")}
        />
      )}

      <form
        onSubmit={handlePasswordRecovery}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="Enter your email"
          className="text-xs md:text-sm lg:text-base w-full mb-4 p-3 border rounded-lg text-stone-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {error && <p className="text-red-600 mb-4">{error}</p>}
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
