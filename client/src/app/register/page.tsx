"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AlertBox from "../../components/AlertBox";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    digit: false,
    symbol: false,
  });
  const [error, setError] = useState("");
  const [httpError, setHttpError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const checkPasswordCriteria = (password: string) => {
    setPasswordCriteria({
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      digit: /\d/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !username || !password) {
      setError("All fields are required.");
      return;
    }

    if (
      !passwordCriteria.length ||
      !passwordCriteria.lowercase ||
      !passwordCriteria.uppercase ||
      !passwordCriteria.digit ||
      !passwordCriteria.symbol
    ) {
      setError("Password does not meet the criteria.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5175/api/Auth/register",
        {
          email,
          username,
          password,
        }
      );

      if (response.status === 200) {
        const loginResponse = await axios.post(
          "http://localhost:5175/api/Auth/login",
          {
            email,
            password,
          }
        );
        localStorage.setItem("token", loginResponse.data.token);

        setSuccess("Registration successful. Redirecting...");
        setError("");

        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } catch (error: any) {
      if (error.response) {
        setHttpError(
          error.response.data || "Registration failed. Please try again."
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
        Register
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
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm md:max-w-md"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="Email"
          className="text-xs md:text-sm lg:text-base w-full mb-4 p-3 border rounded-lg text-stone-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
          placeholder="Username"
          className="text-xs md:text-sm lg:text-base w-full mb-4 p-3 border rounded-lg text-stone-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            checkPasswordCriteria(e.target.value);
            setError("");
          }}
          placeholder="Password"
          className="text-xs md:text-sm lg:text-base w-full mb-4 p-3 border rounded-lg text-stone-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
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

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          className="btn text-xs md:text-sm lg:text-base bg-green-600 hover:bg-green-700 w-full text-white py-2 rounded-lg transition duration-300 ease-in-out transform active:scale-95"
        >
          Register
        </button>
      </form>

      <div className="mt-2">
        <span className="text-gray-600 text-xs md:text-sm lg:text-base">
          Already have an account?
        </span>
        <Link
          href="/login"
          className="text-blue-500 hover:underline ml-2 text-xs md:text-sm lg:text-base"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
