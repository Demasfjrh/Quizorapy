import { useParams, Link } from 'react-router';
import { useEffect, useState } from 'react';
import { getQuizById } from '../services/api';

export default function QuizDetail() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    getQuizById(id).then(setQuiz).catch(console.error);
  }, [id]);

  if (!quiz) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-purple-700 mb-4">{quiz.title}</h1>
      <p className="text-gray-700 mb-6">{quiz.description}</p>
      <Link
        to={`/play/${id}`}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-800">
        Mulai Quiz 🎯
      </Link>
    </div>
  );
}
