"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import AlertBox from "../../components/AlertBox";

export default function PasswordResetPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [httpError, setHttpError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    digit: false,
    symbol: false,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const checkPasswordCriteria = (password: string) => {
    setPasswordCriteria({
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      digit: /\d/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !passwordCriteria.length ||
      !passwordCriteria.lowercase ||
      !passwordCriteria.uppercase ||
      !passwordCriteria.digit ||
      !passwordCriteria.symbol
    ) {
      setError("Password must satisfy all criteria.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords must match.");
      return;
    }

    try {
      await axios.post("http://localhost:5175/api/auth/password-reset", {
        email,
        token,
        newPassword,
      });
      setSuccess("Password has been reset successfully.");
      setError("");

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error: any) {
      if (error.response) {
        setHttpError(
          error.response?.data ||
            "Password reset failed. Please try again later."
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
        Reset Password
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
        onSubmit={handlePasswordReset}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <input
          type="password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            checkPasswordCriteria(e.target.value);
            setError("");
          }}
          placeholder="New Password"
          className="text-xs md:text-sm lg:text-base w-full mb-4 p-3 border rounded-lg text-stone-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <ul className="mb-4">
          <li
            className={`${
              passwordCriteria.length ? "text-green-600" : "text-red-600"
            } text-xs md:text-sm lg:text-base`}
          >
            {passwordCriteria.length ? "✔️" : "❌"} At least 8 characters
          </li>
          <li
            className={`${
              passwordCriteria.lowercase ? "text-green-600" : "text-red-600"
            } text-xs md:text-sm lg:text-base`}
          >
            {passwordCriteria.lowercase ? "✔️" : "❌"} Contains a lowercase
            letter
          </li>
          <li
            className={`${
              passwordCriteria.uppercase ? "text-green-600" : "text-red-600"
            } text-xs md:text-sm lg:text-base`}
          >
            {passwordCriteria.uppercase ? "✔️" : "❌"} Contains an uppercase
            letter
          </li>
          <li
            className={`${
              passwordCriteria.digit ? "text-green-600" : "text-red-600"
            } text-xs md:text-sm lg:text-base`}
          >
            {passwordCriteria.digit ? "✔️" : "❌"} Contains a number
          </li>
          <li
            className={`${
              passwordCriteria.symbol ? "text-green-600" : "text-red-600"
            } text-xs md:text-sm lg:text-base`}
          >
            {passwordCriteria.symbol ? "✔️" : "❌"} Contains a symbol
          </li>
        </ul>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError("");
          }}
          placeholder="Confirm New Password"
          className="text-xs md:text-sm lg:text-base w-full mb-4 p-3 border rounded-lg text-stone-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <button
          type="submit"
          className="btn text-xs md:text-sm lg:text-base bg-indigo-600 hover:bg-indigo-700 w-full text-white py-2 rounded-lg transition duration-300 ease-in-out transform active:scale-95"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
