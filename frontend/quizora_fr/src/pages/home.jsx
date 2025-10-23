import { Link } from 'react-router';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center p-8">
      <h1 className="text-4xl font-bold mb-4 text-purple-700">
        Selamat Datang di Quizora 🎮
      </h1>
      <p className="max-w-xl text-gray-600 mb-8">
        Website interaktif untuk menguji pengetahuanmu! Pilih quiz favoritmu dan
        jawab pertanyaan satu per satu seperti Kahoot!
      </p>
      <Link
        to="/quiz"
        className="bg-purple-600 hover:bg-purple-800 text-white px-6 py-3 rounded-lg shadow-lg">
        Mulai Sekarang
      </Link>
    </div>
  );
}
