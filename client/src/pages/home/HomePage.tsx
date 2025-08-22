import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-800/90 flex items-center justify-center">
      <div className="bg-white/50 backdrop-blur-lg shadow-md rounded-3xl p-10 w-full text-center max-w-md border border-black-400">
        <h1 className="gap-3 text-4xl font-extrabold text-gray-800 mb-4">
            CABLE PIDGEON
        </h1>
        <img src="/pidgeon.png" alt="Pidgeon" className="mx-auto mb-4 w-15 h-15" />
        <h2 className="text-lg font-medium text-gray-700 mb-4">  
            Our pigeons work tirelessly to bring you your messages!
        </h2>
        <p className="text-xs mb-6 italic">
          NOTE: they might get confused
        </p>
        <Link
          to="/login"
          className="inline-block bg-blue-700/70 text-white px-6 py-2 rounded-xl hover:bg-blue-700/90 transition"
        >
          Log in
        </Link>
      </div>
    </main>
  );
}