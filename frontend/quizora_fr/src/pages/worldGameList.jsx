// src/pages/WordGamesList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getWordGames } from "../services/api";

export default function WordGamesList() {
  const [puzzles, setPuzzles] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const categories = ["Semua", "Budaya", "Makanan", "Matematika", "Pemrograman", "Fisika"];

  useEffect(() => {
    getWordGames({ search, category: category === "Semua" ? "" : category })
      .then(setPuzzles)
      .catch(console.error);
  }, [search, category]);

  return (
    // Latar Belakang: Dark Mode, gradien Moonlight Blue
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 bg-[url('/puzzle.svg')] bg-cover bg-fixed border-t-4 border-cyan-400">
      <h1 
        // Judul: Efek Neon Pink
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-cyan-400 text-center mb-6 drop-shadow-lg shadow-pink-500/50">
        🧩 Word Search Playground
      </h1>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari puzzle..."
          // Input: Gaya Dark Mode Neon
          className="px-4 py-3 border border-cyan-500 bg-gray-800 text-white rounded-lg w-full max-w-md shadow-xl shadow-cyan-500/10 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto px-2 pb-3 mb-6 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            // Tombol Kategori: Moonlight Blue/Neon
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition font-semibold ${
              category === cat
                ? "bg-cyan-500 text-gray-900 shadow-xl shadow-cyan-500/50" // Active: Cyan (Moonlight Blue)
                : "bg-gray-700/70 hover:bg-gray-600/70 text-gray-200 border border-pink-500/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {puzzles.map((p) => (
          <div
            key={p.id}
            // Kartu: Gaya Dark Mode bergaris Neon
            className="rounded-xl p-5 bg-gray-800 shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.03] cursor-pointer border border-pink-500/70 transition"
          >
            <h3 className="text-xl font-bold text-cyan-400">{p.title}</h3>
            <p className="text-sm text-gray-400 mt-2 line-clamp-2">{p.description}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate(`/wordgames/play/${p.id}`)}
                // Tombol Utama: Neon Pink
                className="flex-1 bg-pink-600 text-white rounded-lg px-4 py-2 hover:bg-pink-500 shadow-lg shadow-pink-500/30 font-bold"
              >
                Main 🎮
              </button>
              <button
                onClick={() => navigate(`/wordgames/${p.id}`)}
                className="px-4 py-2 text-cyan-400 font-semibold border border-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition"
              >
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}