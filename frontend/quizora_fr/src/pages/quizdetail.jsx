import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { getQuizById } from "../services/api";

export default function QuizDetail() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    getQuizById(id).then(setQuiz).catch(console.error);
  }, [id]);

  if (!quiz) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-purple-700 mb-2 drop-shadow-sm">
        {quiz.title}
      </h1>

      <p className="text-gray-700 mb-6 leading-relaxed">
        {quiz.description}
      </p>

      <Link
        to={`/play/${id}`}
        className="inline-block bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition text-lg shadow"
      >
        Mulai Quiz 🧩
      </Link>
    </div>
  );
}
