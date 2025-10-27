// src/pages/QuizList.jsx
import { useEffect, useState } from "react";
import { getQuizzes, getCategories } from "../services/api.js";
import { useNavigate } from "react-router";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    const params = { search, category: activeCategory, sort };
    getQuizzes(params).then(setQuizzes).catch(console.error);
  }, [search, activeCategory, sort]);

  return (
    // Latar Belakang: Gradien biru kehijauan (air dan alam)
    <div className="p-6 max-w-6xl mx-auto bg-linear-to-br from-green-50 to-blue-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-green-700 mb-6 text-center shadow-lg p-3 bg-white/70 backdrop-blur-sm border border-green-300">
        Pilih Quiz 🎯
      </h1>

      {/* Search & Sorting */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
        <input
          // Input: Gaya 'Kaca' Frutiger Aero
          className="px-4 py-2 border-2 border-green-300 rounded-lg shadow-inner bg-white/80 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
          placeholder="Cari quiz..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2">
          {["a-z", "z-a", ""].map((s, idx) => (
            <button
              key={idx}
              onClick={() => setSort(s)}
              // Tombol Sort: Efek Gelembung/Glossy
              className={`px-3 py-2 rounded-lg transition font-semibold shadow-md active:shadow-inner ${
                sort === s
                  ? "bg-green-600 text-white shadow-green-400"
                  : "bg-white/90 border border-green-300 hover:bg-green-100/90 text-green-700"
              }`}
            >
              {idx === 0 ? "A - Z" : idx === 1 ? "Z - A" : "Reset"}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto justify-center mb-6 pb-1">
        <button
          onClick={() => setActiveCategory("")}
          // Tombol Kategori: Gaya 'Pill' Alam
          className={`px-3 py-1 rounded-full text-sm font-medium transition ${
            activeCategory === ""
              ? "bg-blue-600 text-white shadow-md shadow-blue-400"
              : "border border-blue-400 bg-white/80 hover:bg-blue-200/90 text-blue-700"
          }`}
        >
          Semua
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              activeCategory === cat
                ? "bg-blue-600 text-white shadow-md shadow-blue-400"
                : "border border-blue-400 bg-white/80 hover:bg-blue-200/90 text-blue-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {quizzes.map((q) => (
          <div
            key={q.id}
            // Kartu: Desain 'Glassy' dengan border hijau
            className="p-5 bg-white/90 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition cursor-pointer border-t-2 border-l-2 border-green-300 backdrop-blur-sm"
          >
            <h3 className="font-bold mb-2 text-green-800">
              {q.title}
            </h3>

            <p className="text-sm text-gray-700 line-clamp-2 mb-3">
              {q.description}
            </p>

              <button
                onClick={() => navigate(`/quiz/${q.id}`)}
                className="w-full mt-2 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition font-semibold shadow-sm"
              >
                Lihat Detail
              </button>

              <button
                onClick={() => navigate(`/quiz/${q.id}`)}
                className="w-full mt-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition font-semibold shadow-sm"
              >
                Mulai Sekarang 🚀
              </button>
          </div>
        ))}
      </div>
    </div>
  );
}