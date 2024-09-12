import { useEffect } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setToken } from "@/store/slices/authSlice";

export default function LandingPage() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 p-4">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-stone-800 text-center">
        E-Commerce App
      </h1>
      <div className="flex space-x-4">
        <Link
          href="/login"
          className="btn text-xs md:text-sm lg:text-base bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out transform active:scale-95"
          style={{ textDecoration: "none" }}
        >
          Login
        </Link>
        <Link
          href="/register"
          className="btn text-xs md:text-sm lg:text-base bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out transform active:scale-95"
          style={{ textDecoration: "none" }}
        >
          Register
        </Link>
      </div>
    </div>
  );
}
