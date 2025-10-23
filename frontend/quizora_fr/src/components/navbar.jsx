import { Link } from 'react-router';

export default function Navbar() {
  return (
    <nav className="bg-purple-700 text-white px-6 py-3 flex justify-between items-center shadow">
      <Link
        to="/"
        className="font-bold text-lg">
        Quizora
      </Link>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
      </div>
    </nav>
  );
}
