// quizdetail.jsx
import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { getQuizById } from "../services/api";

export default function QuizDetail() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    getQuizById(id).then(setQuiz).catch(console.error);
  }, [id]);

  if (!quiz) return <p className="text-center p-6 text-green-700">Loading...</p>;

  return (
    // Kontainer Utama: Latar belakang gradien lembut, mirip QuizList
    <div className="p-6 max-w-3xl mx-auto text-center bg-linear-to-br from-green-50 to-blue-100 min-h-[80vh] flex flex-col justify-center"> 
      {/* Kartu Detail: Gaya Glassy/Frutiger Aero */}
      <div className="p-8 bg-white/70 rounded-xl shadow-2xl border-t-2 border-l-2 border-green-300 backdrop-blur-sm"> 
        <h1 className="text-4xl font-extrabold text-green-700 mb-4 drop-shadow-md">
          {quiz.title}
        </h1>

        <p className="text-gray-700 mb-8 leading-relaxed text-lg">
          {quiz.description}
        </p>

        <Link
          to={`/play/${id}`}
          // Tombol Utama: Warna biru laut, efek 3D/Glossy
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-xl font-bold shadow-lg shadow-blue-400/50 active:shadow-inner"
        >
          Mulai Quiz 🧩
        </Link>
      </div>
    </div>
  );
}