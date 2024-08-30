"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5175/api/Auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 p-4">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-stone-800 text-center">
        Login
      </h1>
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm md:max-w-md"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="text-xs md:text-sm lg:text-base w-full mb-4 p-3 border rounded-lg text-stone-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="text-xs md:text-sm lg:text-base w-full mb-4 p-3 border rounded-lg text-stone-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="btn text-xs md:text-sm lg:text-base bg-blue-600 hover:bg-blue-700 w-full text-white py-2 rounded-lg transition duration-300 ease-in-out transform active:scale-95"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <a
            href="/password-recovery"
            className="text-xs md:text-sm lg:text-base text-blue-500 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
      </form>
    </div>
  );
}
