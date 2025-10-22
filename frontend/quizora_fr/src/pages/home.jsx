import { useEffect, useState } from "react";
import { getQuizzes } from "../services/api";

export default function Home() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    getQuizzes().then(setQuizzes).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Daftar Quiz</h1>
      <ul className="space-y-3">
        {quizzes.map((q) => (
          <li key={q.id} className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold">{q.title}</h2>
            <p>{q.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
