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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-pulse h-6 w-48 bg-gray-200 rounded mb-3" />
          <div className="animate-pulse h-4 w-64 bg-gray-200 rounded mb-2" />
          <div className="animate-pulse h-3 w-36 bg-gray-200 rounded mt-6" />
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="text-center text-red-600">{fetchError}</div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="text-center">Quiz tidak ditemukan.</div>
      </div>
    );
  }

  // If result present -> show final screen (no alert)
  if (result) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
        <div className="bg-white shadow rounded-xl p-6 w-full max-w-md text-center">
          <h3 className="text-2xl font-semibold mb-2">Quiz Selesai 🎉</h3>
          <p className="text-lg">
            Skor: <span className="font-bold">{result.correct}</span> /{' '}
            {result.total}
          </p>
          <p className="text-sm text-gray-500 mt-1">
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
              className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow">
              Main Lagi
            </button>

            <button
              onClick={() => navigate('/quiz')}
              className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg">
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
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-2xl">
        {/* reserve space to prevent layout shift */}
        <div className="bg-white rounded-2xl shadow p-6 min-h-[220px] md:min-h-[260px]">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">
              Pertanyaan {currentIndex + 1} dari {quiz.questions.length}
            </div>
            <div className="text-sm text-gray-500">
              {/* simple progress bar */}
              <div className="w-36 bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-purple-600 h-2 transition-all"
                  style={{
                    width: `${(currentIndex / quiz.questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg md:text-xl font-semibold">
              {currentQuestion.text}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {currentQuestion.choices.map((choice) => {
              const isSelected = choice.id === selectedChoiceId;
              // show correct/incorrect after selection (visual hint)
              const showResultState = selectedChoiceId !== null;
              const isCorrect = showResultState && choice.is_correct === true;

              const base =
                'px-4 py-3 rounded-lg text-left border transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-300';

              const selectedClass = showResultState
                ? isCorrect
                  ? 'bg-green-600 text-white border-green-600'
                  : isSelected
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-gray-100 text-gray-700'
                : 'bg-white hover:bg-purple-50';

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
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Quiz: {quiz.categories?.join(', ')}
          </div>
          <div className="text-sm text-gray-500">
            {submitting ? 'Mengirim...' : ''}
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
