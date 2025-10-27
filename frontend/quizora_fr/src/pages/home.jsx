// src/pages/Home.jsx
import { Link } from 'react-router';
// usePageTheme dihapus karena user yang atur tema lewat ThemeSelector

export default function Home() {
  return (
    // Latar Belakang: Hijau padang rumput (Bliss)
    <div className="page-root min-h-screen flex flex-col bg-green-50"> 
      <section 
        // Kontainer Utama: Jendela XP 3D
        className="py-20 px-6 text-center max-w-4xl mx-auto mt-10 p-10 bg-white border border-blue-400 shadow-[2px_2px_0px_1px_rgba(0,0,0,0.1)]"> 
        <h1 className="text-5xl font-extrabold text-blue-700 font-[Tahoma] drop-shadow-md">
          Quizora 🧠🎮
        </h1>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto font-[Verdana]">
          Belajar sambil bermain! Pilih mode permainan yang kamu suka — Quiz
          intens atau Puzzle santai.
        </p>

        <div className="flex flex-wrap gap-6 mt-10 justify-center">
          <Link
            to="/quiz"
            // Tombol Gaya XP: Biru cerah, efek 3D (shadow dan border)
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] active:shadow-none border-t border-l border-white transition transform font-bold"> 
            Mulai Quiz ✅
          </Link>

          <Link
            to="/wordgames"
            // Tombol Gaya XP: Hijau cerah, efek 3D
            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] active:shadow-none border-t border-l border-white transition transform font-bold"> 
            Puzzle Kata 🧩
          </Link>
        </div>
      </section>

      <section className="py-16 bg-transparent px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-700 font-[Tahoma]">
          Kenapa Pilih Quizora?
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            // Kartu Fitur: Jendela XP Mini
            className="p-6 bg-white border border-blue-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]"> 
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold mb-2 text-blue-700">Belajar Seru</h3>
            <p className="text-sm text-gray-600 font-[Verdana]">
              Pertanyaan interaktif yang bikin belajar jadi menyenangkan.
            </p>
          </div>
          <div className="p-6 bg-white border border-blue-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold mb-2 text-blue-700">Mode Variatif</h3>
            <p className="text-sm text-gray-600 font-[Verdana]">
              Quiz dan Puzzle saling melengkapi untuk melatih otak.
            </p>
          </div>
          <div className="p-6 bg-white border border-blue-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="font-semibold mb-2 text-blue-700">Update Berkala</h3>
            <p className="text-sm text-gray-600 font-[Verdana]">
              Konten baru terus hadir — tetap semangat!
            </p>
          </div>
        </div>
      </section>

      <footer 
        // Footer: Taskbar mini
        className="w-full py-4 text-center text-gray-700 bg-blue-300 border-t-2 border-blue-500 mt-auto font-[Verdana] text-sm">
        &copy; {new Date().getFullYear()} Quizora — Game Edukatif
      </footer>
    </div>
  );
}