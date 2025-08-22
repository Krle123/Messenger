import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-gray-800/90 flex items-center justify-center">
      <div className="bg-white/50 backdrop-blur-lg shadow-md rounded-3xl p-10 w-full max-w-md border border-black-400 text-center">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page not found</h2>
        <p className="text-gray-600-center mb-6">
          The page you're looking for no longer exists.
        </p>
        <Link
          to="/home"
          className="inline-block bg-blue-700/70 text-white px-6 py-2 rounded-xl hover:bg-blue-700/90 transition"
        >
          Back to home page
        </Link>
      </div>
    </main>
  );
}
