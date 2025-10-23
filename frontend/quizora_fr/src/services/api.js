const API_BASE = "http://127.0.0.1:8000"; // ganti ke URL backend-mu jika deploy

// ==== QUIZ ====
export async function submitQuiz(quizId, answers) {
  // answers: [{ question_id: number, choice_id: number }, ...]
  const res = await fetch(`${API_BASE}/quiz/${quizId}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error("Gagal submit jawaban: " + text);
  }
  return await res.json(); // { total, correct, score_percent }
}

// 📋 Ambil daftar semua quiz
export async function getQuizzes() {
  const res = await fetch(`${API_BASE}/quiz`);
  if (!res.ok) throw new Error("Gagal mengambil data quiz");
  return await res.json();
}

// 📘 Ambil detail quiz (berisi semua pertanyaan & pilihan)
export async function getQuizById(id) {
  const res = await fetch(`${API_BASE}/quiz/${id}`);
  if (!res.ok) throw new Error("Gagal mengambil detail quiz");
  return await res.json();
}

// 🎯 Ambil satu pertanyaan berdasarkan urutan (untuk mode main 1 per 1 seperti Kahoot)
export async function getQuestionByNumber(quizId, number) {
  const res = await fetch(`${API_BASE}/quiz/${quizId}/question/${number}`);
  if (!res.ok) throw new Error("Gagal mengambil pertanyaan");
  return await res.json();
}

// 🏠 Ambil info homepage (opsional untuk tampilan awal)
export async function getHomepageInfo() {
  const res = await fetch(`${API_BASE}/`);
  if (!res.ok) throw new Error("Gagal mengambil info homepage");
  return await res.json();
}

// di atas sudah ada getQuizById
export async function getQuestionsByQuizId(quizId) {
  // Ambil seluruh quiz lalu kembalikan array questions
  const quiz = await getQuizById(quizId);
  return quiz.questions || [];
}
