import { useEffect, useState } from "react";
import { getWordGames } from "../services/api";
import { useNavigate } from "react-router";

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
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 p-6 bg-[url('/puzzle.svg')] bg-cover bg-fixed">
      <h1 className="text-4xl font-extrabold text-orange-700 text-center drop-shadow mb-6">
        🧩 Word Search Playground
      </h1>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari puzzle..."
          className="px-4 py-3 border rounded-xl w-full max-w-md shadow focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto px-2 pb-3 mb-6 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition font-semibold ${
              category === cat
                ? "bg-orange-500 text-white shadow-md"
                : "bg-white/70 hover:bg-orange-200"
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
            className="rounded-2xl p-5 bg-white shadow-lg hover:shadow-2xl hover:scale-[1.03] cursor-pointer border border-orange-200 transition"
          >
            <h3 className="text-xl font-bold text-orange-700">{p.title}</h3>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{p.description}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate(`/wordgames/play/${p.id}`)}
                className="flex-1 bg-orange-500 text-white rounded-lg px-4 py-2 hover:bg-orange-600"
              >
                Main 🎮
              </button>
              <button
                onClick={() => navigate(`/wordgames/${p.id}`)}
                className="px-4 py-2 text-orange-600 font-semibold"
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
