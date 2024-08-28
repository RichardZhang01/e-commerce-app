import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300">
      <h1 className="text-5xl font-extrabold mb-8 text-stone-800">
        E-Commerce App
      </h1>
      <div className="space-x-4">
        <Link
          href="/login"
          className="btn bg-blue-600 hover:bg-blue-700"
          style={{ textDecoration: "none" }}
        >
          Login
        </Link>
        <Link
          href="/register"
          className="btn bg-green-600 hover:bg-green-700"
          style={{ textDecoration: "none" }}
        >
          Register
        </Link>
      </div>
    </div>
  );
}
