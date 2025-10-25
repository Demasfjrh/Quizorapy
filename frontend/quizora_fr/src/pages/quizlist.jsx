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
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center drop-shadow">
        Pilih Quiz 🎯
      </h1>

      {/* Search & Sorting */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
        <input
          className="border px-4 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
          placeholder="Cari quiz..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2">
          {["a-z", "z-a", ""].map((s, idx) => (
            <button
              key={idx}
              onClick={() => setSort(s)}
              className={`px-3 py-2 rounded-xl border transition ${
                sort === s
                  ? "bg-purple-600 text-white"
                  : "hover:bg-purple-100"
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
          className={`px-3 py-1 rounded-full text-sm ${
            activeCategory === ""
              ? "bg-purple-600 text-white"
              : "border hover:bg-purple-100"
          }`}
        >
          Semua
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm ${
              activeCategory === cat
                ? "bg-purple-600 text-white"
                : "border hover:bg-purple-100"
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
            className="p-5 bg-white rounded-2xl shadow hover:shadow-lg hover:scale-[1.02] transition cursor-pointer border border-purple-100"
          >
            <h3 className="font-semibold mb-2 text-purple-700">
              {q.title}
            </h3>

            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {q.description}
            </p>

              <button
                onClick={() => navigate(`/quiz/${q.id}`)}
                className="w-full mt-2 px-4 py-2 rounded-xl bg-pink-500 text-white hover:bg-purple-700 transition"
              >
                Lihat Detail
              </button>

            <button
              onClick={() => navigate(`/quiz/${q.id}`)}
              className="w-full mt-2 px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              Mulai Sekarang 🚀
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
