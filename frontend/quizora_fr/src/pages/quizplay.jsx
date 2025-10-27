// src/pages/QuizPlay.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getQuizById, submitQuiz } from '../services/api.js';
import Toaster from '../components/toaster';

export default function QuizPlay() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState(null);
  const [answers, setAnswers] = useState([]); // {question_id, choice_id}
  const [submitting, setSubmitting] = useState(false);

  const [result, setResult] = useState(null); // { total, correct, score_percent }
  const [toast, setToast] = useState({ open: false, msg: '', type: 'info' });

  useEffect(() => {
    let mounted = true;
    async function fetchQuiz() {
      setLoading(true);
      try {
        const data = await getQuizById(id);
        if (!mounted) return;
        setQuiz(data);
      } catch (err) {
        console.error(err);
        setFetchError('Gagal memuat quiz. Coba refresh halaman.');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchQuiz();
    return () => {
      mounted = false;
    };
  }, [id]);

  const currentQuestion = quiz?.questions?.[currentIndex];

  // helper: show toast
  function showToast(msg, type = 'info') {
    setToast({ open: true, msg, type });
  }

  // user chooses an option
  const handleChoose = async (choiceId) => {
    if (!currentQuestion || selectedChoiceId !== null || submitting) return;

    setSelectedChoiceId(choiceId);
    const newAnswers = [
      ...answers,
      { question_id: currentQuestion.id, choice_id: choiceId },
    ];
    setAnswers(newAnswers);

    // small delay to show selection effect
    setTimeout(async () => {
      // if more questions -> next
      if (currentIndex + 1 < (quiz?.questions?.length || 0)) {
        setCurrentIndex((c) => c + 1);
        setSelectedChoiceId(null);
      } else {
        // finish -> submit
        try {
          setSubmitting(true);
          const res = await submitQuiz(quiz.id, newAnswers);
          setResult(res);
          showToast('Quiz selesai — hasil sudah dihitung', 'success');
        } catch (err) {
          console.error(err);
          showToast('Gagal mengirim jawaban', 'error');
        } finally {
          setSubmitting(false);
        }
      }
    }, 700);
  };

  // Loading & Error UI (sedikit sentuhan natural)
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6 bg-linear-to-br from-green-50 to-blue-100">
        <div className="text-center">
          <div className="animate-pulse h-6 w-48 bg-green-200 rounded mb-3" />
          <div className="animate-pulse h-4 w-64 bg-blue-200 rounded mb-2" />
          <div className="animate-pulse h-3 w-36 bg-green-200 rounded mt-6" />
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6 bg-linear-to-br from-green-50 to-blue-100">
        <div className="text-center text-red-600 font-semibold border-2 border-red-400 p-4 bg-white/70 rounded-lg shadow-md">{fetchError}</div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6 bg-linear-to-br from-green-50 to-blue-100">
        <div className="text-center text-green-700 font-semibold border-2 border-green-400 p-4 bg-white/70 rounded-lg shadow-md">Quiz tidak ditemukan.</div>
      </div>
    );
  }

  // Result UI (tetap natural/glassy)
  if (result) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 bg-linear-to-br from-green-50 to-blue-100">
        {/* Hasil: Kartu Glassy dengan border tebal */}
        <div className="bg-white/90 shadow-2xl rounded-xl p-8 w-full max-w-md text-center border-t-4 border-b-4 border-green-500 backdrop-blur-sm"> 
          <h3 className="text-2xl font-bold mb-2 text-green-700">Quiz Selesai 🎉</h3>
          <p className="text-xl text-gray-700">
            Skor: <span className="font-extrabold text-blue-600">{result.correct}</span> /{' '}
            {result.total}
          </p>
          <p className="text-md text-gray-600 mt-1">
            ({result.score_percent.toFixed(2)}%)
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => {
                // replay same quiz
                setAnswers([]);
                setResult(null);
                setCurrentIndex(0);
                setSelectedChoiceId(null);
                showToast('Mulai ulang quiz', 'info');
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition font-semibold"> 
              Main Lagi
            </button>

            <button
              onClick={() => navigate('/quiz')}
              className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-100 transition font-semibold">
              Kembali ke Daftar Quiz
            </button>
          </div>
        </div>

        <Toaster
          open={toast.open}
          message={toast.msg}
          type={toast.type}
          onClose={() => setToast({ ...toast, open: false })}
        />
      </div>
    );
  }

  // MAIN PLAY UI
  return (
    <div className="p-6 flex justify-center bg-linear-to-br from-green-50 to-blue-100 min-h-screen">
      <div className="w-full max-w-2xl mt-10">
        {/* Kontainer Pertanyaan: Kartu Glassy/Aero */}
        <div className="bg-white/90 rounded-xl shadow-2xl p-6 min-h-[220px] md:min-h-[260px] border-t-2 border-l-2 border-green-300 backdrop-blur-sm"> 
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-green-700 font-semibold">
              Pertanyaan {currentIndex + 1} dari {quiz.questions.length}
            </div>
            <div className="text-sm text-blue-700">
              {/* Progres Bar: Warna Hijau Alam */}
              <div className="w-36 bg-green-100 h-2 rounded-full overflow-hidden shadow-inner"> 
                <div
                  className="bg-green-500 h-2 transition-all"
                  style={{
                    width: `${(currentIndex / quiz.questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">
              {currentQuestion.text}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {currentQuestion.choices.map((choice) => {
              const isSelected = choice.id === selectedChoiceId;
              const showResultState = selectedChoiceId !== null;
              const isCorrect = showResultState && choice.is_correct === true;

              // Base Button Style: Clean, bordered, slightly glassy look
              const base =
                'px-4 py-3 rounded-xl text-left border-2 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-4 font-medium text-gray-800 shadow-md active:shadow-inner';

              // Selection/Result States
              const selectedClass = showResultState
                ? isCorrect
                  ? 'bg-green-500 text-white border-green-700 shadow-green-400/50' // Correct: Green
                  : isSelected
                  ? 'bg-red-500 text-white border-red-700 shadow-red-400/50' // Incorrect: Red
                  : 'bg-white/70 text-gray-700 border-gray-300' // Unselected: Faded
                : 'bg-white hover:bg-blue-50 border-blue-400 focus:ring-blue-300'; // Default: Blue accent

              return (
                <button
                  key={choice.id}
                  onClick={() => handleChoose(choice.id)}
                  disabled={selectedChoiceId !== null}
                  className={`${base} ${selectedClass}`}
                  style={{ minHeight: 56 }}>
                  <div className="text-sm md:text-base">{choice.text}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* small footer */}
        <div className="mt-4 flex justify-between items-center px-2">
          <div className="text-sm text-green-700 font-semibold">
            Kategori: {quiz.categories?.join(', ')}
          </div>
          <div className="text-sm text-blue-700 font-semibold">
            {submitting ? 'Mengirim Jawaban...' : ''}
          </div>
        </div>
      </div>

      <Toaster
        open={toast.open}
        message={toast.msg}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </div>
  );
}