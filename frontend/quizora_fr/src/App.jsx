import { BrowserRouter, Routes, Route } from "react-router";
import QuizList from "./pages/quizlist";
import QuizDetail from "./pages/quizdetail";
import QuizPlay from "./pages/quizplay";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import WordGamePlay from "./pages/worldGamePlay";
import WordGamesList from "./pages/worldGameList";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar selalu ada */}
      <Navbar />

      {/* Main Content */}
      <div className="pt-20 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<QuizList />} />
          <Route path="/quiz/:id" element={<QuizDetail />} />
          <Route path="/play/:id" element={<QuizPlay />} />
          <Route path="/wordgames" element={<WordGamesList />} />
          <Route path="/wordgames/play/:id" element={<WordGamePlay />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
