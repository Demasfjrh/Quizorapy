// src/components/Navbar.jsx
import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="bg-white/70 backdrop-blur-md sticky top-0 z-30 px-6 py-3 flex justify-between items-center border-b dark:bg-black/40">
      <Link to="/" className="font-extrabold text-xl text-purple-700 dark:text-cyan-200">
        Quizora
      </Link>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex gap-4 text-sm">
          <Link to="/" className="hover:text-purple-600 dark:hover:text-cyan-200">Home</Link>
          <Link to="/quiz" className="hover:text-purple-600 dark:hover:text-cyan-200">Quiz</Link>
          <Link to="/wordgames" className="hover:text-purple-600 dark:hover:text-cyan-200">Puzzle</Link>
        </div>
      </div>
    </nav>
  );
}
