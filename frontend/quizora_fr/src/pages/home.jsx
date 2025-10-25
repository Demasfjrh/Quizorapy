// src/pages/Home.jsx
import { Link } from 'react-router';
// usePageTheme dihapus karena user yang atur tema lewat ThemeSelector

export default function Home() {
  return (
    <div className="page-root min-h-screen flex flex-col">
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 dark:from-cyan-300 dark:to-blue-400">
          Quizora 🧠🎮
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Belajar sambil bermain! Pilih mode permainan yang kamu suka — Quiz
          intens atau Puzzle santai.
        </p>

        <div className="flex flex-wrap gap-6 mt-10 justify-center">
          <Link
            to="/quiz"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow transition transform hover:scale-105">
            Mulai Quiz ✅
          </Link>

          <Link
            to="/wordgames"
            className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow transition transform hover:scale-105">
            Puzzle Kata 🧩
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-transparent px-6">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-cyan-100">
          Kenapa Pilih Quizora?
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow dark:bg-gray-800">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold mb-2">Belajar Seru</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Pertanyaan interaktif yang bikin belajar jadi menyenangkan.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow dark:bg-gray-800">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold mb-2">Mode Variatif</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Quiz dan Puzzle saling melengkapi untuk melatih otak.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow dark:bg-gray-800">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="font-semibold mb-2">Update Berkala</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Konten baru terus hadir — tetap semangat!
            </p>
          </div>
        </div>
      </section>

      <footer className="w-full py-6 text-center text-gray-600 dark:text-gray-300 mt-auto">
        &copy; {new Date().getFullYear()} Quizora — Game Edukatif
      </footer>
    </div>
  );
}
