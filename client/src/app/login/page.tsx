"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import axios from "axios";
import AlertBox from "@/components/AlertBox";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [httpError, setHttpError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

   useEffect(() => {
     if (isAuthenticated) {
       router.push("/"); 
     }
   }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5175/api/Auth/login",
        {
          email,
          password,
        }
      );
      setSuccess("Login successful. Redirecting...");
      setError("");

      const token = response.data.token;
      localStorage.setItem("token", token);
      dispatch(setToken(token)); 

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error: any) {
      if (error.response) {
        setHttpError(
          error.response?.data || "Login failed. Please check your credentials."
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
        Login
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
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm md:max-w-md"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(""); // Clear error when typing
          }}
          placeholder="Email"
          className="text-xs md:text-sm lg:text-base w-full mb-4 p-3 border rounded-lg text-stone-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(""); // Clear error when typing
          }}
          placeholder="Password"
          className="text-xs md:text-sm lg:text-base w-full mb-4 p-3 border rounded-lg text-stone-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <button
          type="submit"
          className="btn text-xs md:text-sm lg:text-base bg-blue-600 hover:bg-blue-700 w-full text-white py-2 rounded-lg transition duration-300 ease-in-out transform active:scale-95"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <Link
            href="/password-recovery"
            className="text-xs md:text-sm lg:text-base text-blue-500 hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
      </form>

      <div className="mt-2">
        <span className="text-gray-600 text-xs md:text-sm lg:text-base">
          Don't have an account?
        </span>
        <Link
          href="/register"
          className="text-blue-500 hover:underline ml-2 text-xs md:text-sm lg:text-base"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
