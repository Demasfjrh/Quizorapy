const API_BASE = "http://127.0.0.1:8000";

export async function getQuizzes() {
  const res = await fetch(`${API_BASE}/quiz`);
  if (!res.ok) throw new Error("Gagal mengambil data quiz");
  return await res.json();
}

export async function getQuizById(id) {
  const res = await fetch(`${API_BASE}/quiz/${id}`);
  if (!res.ok) throw new Error("Gagal mengambil detail quiz");
  return await res.json();
}
