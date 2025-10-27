// Ambil URL dari environment (Vercel / Netlify / local)
const API_BASE = import.meta.env.VITE_API_URL;

// Homepage
export async function getHomepageInfo() {
  const res = await fetch(`${API_BASE}/`);
  return await res.json();
}

// Quizzes
export async function getQuizzes({ search = "", category = "", sort = "" } = {}) {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category) params.append("category", category);
  if (sort) params.append("sort", sort);

  const url = `${API_BASE}/quiz?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Gagal fetch quiz");
  return await res.json();
}

export async function getCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error("Gagal mengambil kategori");
  return await res.json();
}

export async function getQuizById(id) {
  const res = await fetch(`${API_BASE}/quiz/${id}`);
  if (!res.ok) throw new Error("Gagal mengambil detail quiz");
  return await res.json();
}

export async function getQuestionByNumber(quizId, number) {
  const res = await fetch(`${API_BASE}/quiz/${quizId}/question/${number}`);
  if (!res.ok) throw new Error("Gagal mengambil pertanyaan");
  return await res.json();
}

export async function submitQuiz(quizId, answers) {
  const res = await fetch(`${API_BASE}/quiz/${quizId}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  });
  if (!res.ok) throw new Error("Submit gagal");
  return await res.json();
}

export async function getQuestionsByQuizId(quizId) {
  const quiz = await getQuizById(quizId);
  return quiz.questions || [];
}

// Wordgame
export async function getWordGames({ search = "", category = "" } = {}) {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category) params.append("category", category);

  const url = `${API_BASE}/wordgames${params.toString() ? "?" + params.toString() : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Gagal mengambil wordgames");
  return await res.json();
}

export async function getWordGameById(id) {
  const res = await fetch(`${API_BASE}/wordgames/${id}`);
  if (!res.ok) throw new Error("Gagal mengambil puzzle");
  return await res.json();
}

export async function submitWordGame(id, foundWords) {
  const res = await fetch(`${API_BASE}/wordgames/${id}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ found: foundWords }),
  });
  if (!res.ok) throw new Error("Gagal submit puzzle");
  return await res.json();
}
