import { useEffect, useState } from 'react';
import { getQuizzes } from '../services/api';
import { Link } from 'react-router';

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    getQuizzes().then(setQuizzes).catch(console.error);
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold text-purple-700 mb-6">
        Pilih Quiz
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((q) => (
          <div
            key={q.id}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">{q.title}</h3>
            <p className="text-gray-600 mb-4">{q.description}</p>
            <Link
              to={`/quiz/${q.id}`}
              className="text-purple-600 font-semibold hover:underline">
              Lihat Detail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
