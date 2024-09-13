import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth, setToken } from "@/store/slices/authSlice";
import { isJwtExpired } from "@/helpers/checkJwtExpiration";
import { RootState } from "@/store/store";

export default function LandingPage() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      if (isJwtExpired(storedToken)) {
        dispatch(clearAuth());
        localStorage.removeItem("token");
      } else {
        dispatch(setToken(storedToken));
      }
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 p-4">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-stone-800 text-center">
        Welcome to My E-Commerce App
      </h1>
      <p className="text-center text-lg md:text-xl text-gray-700 mb-6">
        Your one-stop shop for all your needs!
      </p>
      {isAuthenticated ? (
        <p className="text-green-500 text-lg md:text-xl">You are logged in!</p>
      ) : (
        <p className="text-red-500 text-lg md:text-xl">
          Please log in to access your account.
        </p>
      )}
    </div>
  );
}
