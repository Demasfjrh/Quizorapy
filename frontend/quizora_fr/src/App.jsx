import { BrowserRouter, Routes, Route } from 'react-router';
import QuizList from './pages/QuizList';
import QuizDetail from './pages/QuizDetail';
import QuizPlay from './pages/QuizPlay';
import Navbar from './components/Navbar';
import Home from './pages/home';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/quiz"
          element={<QuizList />}
        />
        <Route
          path="/quiz/:id"
          element={<QuizDetail />}
        />
        <Route
          path="/play/:id"
          element={<QuizPlay />}
        />
      </Routes>
    </BrowserRouter>
  );
}
