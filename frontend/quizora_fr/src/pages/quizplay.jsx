// src/pages/QuizPlay.jsx
import { useEffect, useState } from "react";
import { getQuizById, submitQuiz } from "../services/api"; // pastikan path benar
import { useParams, useNavigate } from "react-router";

export default function QuizPlay() {
  const { id } = useParams(); // quiz id
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]); // [{question_id, choice_id}, ...]
  const [result, setResult] = useState(null); // {total, correct, score_percent}
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getQuizById(id)
      .then((data) => {
        setQuiz(data);
      })
      .catch((err) => {
        console.error(err);
        alert("Gagal memuat quiz");
      });
  }, [id]);

  if (!quiz) return <p className="p-8 text-center">Loading quiz...</p>;

  const questions = quiz.questions || [];
  if (questions.length === 0) return <p className="p-8 text-center">Quiz kosong.</p>;

  const q = questions[current];
  const options = q.options; // expects array [{id, text}] from GET /quiz/:id

  function handleChoose(choiceId) {
    // Simpan jawaban
    setAnswers((prev) => [...prev, { question_id: q.id, choice_id: choiceId }]);

    // next question or submit
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
    } else {
      // selesai -> submit ke server
      submitAnswers([...answers, { question_id: q.id, choice_id: choiceId }]);
    }
  }

  async function submitAnswers(payloadAnswers) {
    try {
      setLoading(true);
      const res = await submitQuiz(quiz.id, payloadAnswers);
      setResult(res);
    } catch (e) {
      console.error(e);
      alert("Gagal submit jawaban");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="p-8 text-center">Mengirim jawaban...</p>;

  if (result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-3xl font-bold text-purple-700">Quiz Selesai 🎉</h1>
        <p className="mt-4 text-lg">
          Skor kamu: {result.correct} / {result.total}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          ({result.score_percent.toFixed(2)}%)
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => {
              // replay
              setAnswers([]);
              setResult(null);
              setCurrent(0);
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            Main Lagi
          </button>

          <button
            onClick={() => navigate("/quiz")}
            className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg"
          >
            Kembali ke Daftar Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-semibold mb-4 text-purple-700">{quiz.title}</h2>
      <p className="text-sm text-gray-500 mb-6">{quiz.description}</p>

      <div className="max-w-2xl mx-auto">
        <div className="mb-4 text-lg">
          Pertanyaan {current + 1} / {questions.length}
        </div>

        <div className="mb-6 text-xl">{q.text}</div>

        <div className="grid grid-cols-1 gap-4">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleChoose(opt.id)}
              className="border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-3 rounded-lg transition"
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
