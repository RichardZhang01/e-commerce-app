import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    dispatch(clearAuth());
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolled(offset > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-10 transition-all duration-300 ${
        scrolled ? "bg-gray-800 h-12" : "bg-gray-900 h-16"
      } flex items-center justify-between px-6`}
    >
      <div className="text-white font-bold text-xl md:text-2xl transition-all duration-300">
        My E-Commerce
      </div>
      <div className="flex space-x-4">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="text-white bg-red-500 px-4 py-2 rounded-lg text-sm md:text-base transition-transform transform active:scale-95"
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/login">
              <a className="text-white text-sm md:text-base hover:underline transition-transform transform active:scale-95">
                Login
              </a>
            </Link>
            <Link href="/register">
              <a className="text-white text-sm md:text-base hover:underline transition-transform transform active:scale-95">
                Register
              </a>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
