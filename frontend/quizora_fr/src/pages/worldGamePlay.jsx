// src/pages/WordGamePlay.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getWordGameById, submitWordGame } from "../services/api";

function coordsKey(r, c) {
  return `${r},${c}`;
}

export default function WordGamePlay() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [puzzle, setPuzzle] = useState(null);
  const [grid, setGrid] = useState([]); // array of rows; each cell: { letter, found: bool }
  const [found, setFound] = useState([]); // array of found words (uppercased)
  const [start, setStart] = useState(null); // { r, c }
  const [highlight, setHighlight] = useState([]); // array of {r,c} path being previewed
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const data = await getWordGameById(id);
        if (!mounted) return;
        setPuzzle(data);
        // transform grid: from ["ABCDE", "..."] -> [[{letter:'A',found:false}, ...], ...]
        const g = (data.grid || []).map((line) =>
          line.split("").map((ch) => ({ letter: ch, found: false }))
        );
        setGrid(g);
        setFound([]); setStart(null); setHighlight([]); setMessage(""); setResult(null);
      } catch (err) {
        console.error(err);
        setMessage("Gagal memuat puzzle.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [id]);

  // compute path between two coords if they are aligned (horiz/vert/diag)
  function computePath(a, b) {
    const dr = b.r - a.r;
    const dc = b.c - a.c;
    const steps = Math.max(Math.abs(dr), Math.abs(dc));
    if (steps === 0) return [{ r: a.r, c: a.c }];

    const stepR = dr === 0 ? 0 : dr / Math.abs(dr);
    const stepC = dc === 0 ? 0 : dc / Math.abs(dc);

    // only allow straight lines: horizontal, vertical or perfect diagonal
    if (!(Math.abs(dr) === Math.abs(dc) || dr === 0 || dc === 0)) return null;

    const path = [];
    let r = a.r, c = a.c;
    for (let i = 0; i <= steps; i++) {
      path.push({ r, c });
      r += stepR;
      c += stepC;
    }
    return path;
  }

  // build uppercased word from path
  function pathToWord(path) {
    return path.map(p => grid[p.r][p.c].letter).join("").toUpperCase();
  }

  // click on a cell: start selection or finish selection
  function onCellClick(r, c) {
    // prevent clicking an already-solved cell as start
    if (grid[r][c].found) {
      setMessage("Kotak sudah ditemukan sebelumnya.");
      // clear any in-progress selection
      setStart(null);
      setHighlight([]);
      return;
    }

    if (!start) {
      setStart({ r, c });
      setHighlight([{ r, c }]);
      setMessage("Pilih kotak akhir...");
      return;
    }

    // compute path from start -> this cell
    const path = computePath(start, { r, c });
    if (!path) {
      setMessage("❌ Pilihan harus lurus: horizontal, vertical, atau diagonal.");
      setStart(null);
      setHighlight([]);
      return;
    }

    const word = pathToWord(path); // uppercase
    const wordsUpper = (puzzle.words || []).map(w => w.toUpperCase());

    // check both directions (allow reverse)
    const reversed = word.split("").reverse().join("");
    let matchedWord = null;
    if (wordsUpper.includes(word)) matchedWord = word;
    else if (wordsUpper.includes(reversed)) matchedWord = reversed; // user picked reverse

    if (matchedWord && !found.includes(matchedWord)) {
      // mark cells in path as found
      setGrid(prev =>
        prev.map((row, rr) =>
          row.map((cell, cc) => {
            const inPath = path.some(p => p.r === rr && p.c === cc);
            return inPath ? { ...cell, found: true } : cell;
          })
        )
      );
      setFound(prev => [...prev, matchedWord]);
      setMessage(`✅ Ketemu: ${matchedWord}`);
    } else if (matchedWord && found.includes(matchedWord)) {
      setMessage(`ℹ️ Kata ${matchedWord} sudah ditemukan.`);
    } else {
      setMessage(`😕 ${word} tidak ada.`);
    }

    // reset selection
    setStart(null);
    setHighlight([]);
  }

  // update highlight when the mouse moves over a cell while a start exists
  // (optional) but we can use onMouseEnter to preview path
  function onCellEnter(r, c) {
    if (!start) return;
    const path = computePath(start, { r, c });
    setHighlight(path || []);
  }

  async function sendScore() {
    if (!puzzle) return;
    try {
      const res = await submitWordGame(puzzle.id, found);
      setResult(res);
      setMessage("Hasil terkirim.");
    } catch (err) {
      console.error(err);
      setMessage("Gagal mengirim hasil.");
    }
  }

  function handleReset() {
    // reset found & grid found flags
    setFound([]);
    setGrid(prev => prev.map(row => row.map(cell => ({ ...cell, found: false }))));
    setStart(null);
    setHighlight([]);
    setMessage("");
    setResult(null);
  }

  if (loading) {
    return <div className="p-6 text-center">Loading puzzle...</div>;
  }

  if (!puzzle) {
    return <div className="p-6 text-center">Puzzle tidak ditemukan.</div>;
  }

  const gridSize = grid.length;

  // helper: check whether a cell is in current highlight
  const isHighlighted = (r, c) => highlight?.some(p => p.r === r && p.c === c);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-5xl mx-auto">
        {/* header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-orange-700">{puzzle.title}</h1>
            <p className="text-sm text-gray-600">{puzzle.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/wordgames")}
              className="text-orange-700 hover:underline"
            >
              ⬅ Kembali
            </button>
            <div className="text-sm text-gray-500">
              Ditemukan: <span className="font-semibold">{found.length}</span> / { (puzzle.words || []).length }
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* board */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100">
            <div
              className="inline-grid mx-auto"
              style={{
                gridTemplateColumns: `repeat(${gridSize}, 44px)`,
                gap: 8,
              }}
            >
              {grid.map((row, r) =>
                row.map((cell, c) => {
                  const solved = cell.found;
                  const active = isHighlighted(r, c);
                  return (
                    <button
                      key={coordsKey(r, c)}
                      onClick={() => onCellClick(r, c)}
                      onMouseEnter={() => onCellEnter(r, c)}
                      className={`w-11 h-11 rounded-lg font-bold text-lg flex items-center justify-center transition-transform
                        ${solved ? "bg-green-400 text-white shadow-inner" : active ? "bg-orange-400 text-white scale-105" : "bg-white border-2 border-orange-200 hover:scale-105"}
                      `}
                      disabled={solved}
                      title={solved ? "Sudah ditemukan" : ""}
                    >
                      {cell.letter}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* sidebar */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100 flex flex-col">
            <h3 className="font-semibold text-orange-700 mb-3">Daftar kata ({(puzzle.words||[]).length})</h3>

            <div className="grid grid-cols-2 gap-2 mb-4">
              { (puzzle.words || []).map((w) => {
                const up = w.toUpperCase();
                const got = found.includes(up);
                return (
                  <div
                    key={w}
                    className={`px-3 py-1 rounded-full text-center text-sm font-semibold transition
                      ${got ? "bg-green-300 text-white line-through" : "bg-orange-100 text-orange-700"}`}
                  >
                    {w}
                  </div>
                );
              })}
            </div>

            <div className="text-sm text-gray-600 mb-3">{message}</div>

            <div className="mt-auto">
              <div className="flex gap-3">
                <button onClick={sendScore} className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold">
                  Kirim Hasil
                </button>
                <button onClick={handleReset} className="px-4 py-2 border rounded-xl">
                  Reset
                </button>
              </div>

              {result && (
                <div className="mt-4 bg-green-50 p-3 rounded">
                  <div>Benar: {result.found_correct} / {result.total}</div>
                  <div>Skor: {result.percent.toFixed(2)}%</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}