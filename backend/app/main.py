from fastapi import FastAPI, HTTPException, Query # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from pydantic import BaseModel # type: ignore
from typing import List, Optional
from app.db import get_session
from app.models import Quiz, Question, Choice, Category
from app.models import Puzzle, PuzzleWord
from sqlalchemy import func # PENTING: Import func untuk lower() # type: ignore

app = FastAPI(title="Quiz Game API", version="2.0.0")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def homepage():
    return {"message": "Welcome to Quiz API 🎮"}

# ✅ List categories
@app.get("/categories")
def get_categories():
    with get_session() as s:
        cats = s.query(Category).order_by(Category.name).all()
        return [c.name for c in cats]

# ✅ List quiz + Filter + Search + Sort
@app.get("/quiz")
def get_quizzes(
    search: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    sort: Optional[str] = Query(None)
):
    with get_session() as s:
        q = s.query(Quiz)

        if search:
            q = q.filter(Quiz.title.ilike(f"%{search}%"))

        if category:
            q = q.join(Quiz.categories).filter(Category.name == category)

        quizzes = q.all()

        if sort == "a-z":
            quizzes = sorted(quizzes, key=lambda x: x.title.lower())
        elif sort == "z-a":
            quizzes = sorted(quizzes, key=lambda x: x.title.lower(), reverse=True)

        return [
            {
                "id": quiz.id,
                "title": quiz.title,
                "description": quiz.description,
                "categories": [c.name for c in quiz.categories],
                "question_count": len(quiz.questions),
            }
            for quiz in quizzes
        ]

# ✅ Full detail quiz
@app.get("/quiz/{quiz_id}")
def get_quiz(quiz_id: int):
    with get_session() as s:
        quiz = s.query(Quiz).filter(Quiz.id == quiz_id).first()
        if not quiz:
            raise HTTPException(404, "Quiz tidak ditemukan")

        return quiz.to_dict()

# ✅ One-by-one question (like Kahoot)
@app.get("/quiz/{quiz_id}/question/{number}")
def get_question(quiz_id: int, number: int):
    with get_session() as s:
        quiz = s.query(Quiz).filter(Quiz.id == quiz_id).first()
        if not quiz:
            raise HTTPException(404, "Quiz tidak ditemukan")

        questions = quiz.questions
        if number < 1 or number > len(questions):
            raise HTTPException(404, "Nomor pertanyaan tidak valid")

        q = questions[number - 1]

        return {
            "quiz_id": quiz.id,
            "question_number": number,
            "text": q.text,
            "options": [{"id": c.id, "text": c.text} for c in q.choices],
        }

# ✅ Submit result
class AnswerItem(BaseModel):
    question_id: int
    choice_id: int

class SubmitPayload(BaseModel):
    answers: List[AnswerItem]

class SubmitResult(BaseModel):
    total: int
    correct: int
    score_percent: float

@app.post("/quiz/{quiz_id}/submit", response_model=SubmitResult)
def submit_quiz(quiz_id: int, payload: SubmitPayload):
    with get_session() as s:
        quiz = s.query(Quiz).filter(Quiz.id == quiz_id).first()
        if not quiz:
            raise HTTPException(404, "Quiz tidak ditemukan")

        correct_map = {
            q.id: {c.id for c in q.choices if c.is_correct}
            for q in quiz.questions
        }

        correct = sum(
            1 for ans in payload.answers
            if ans.choice_id in correct_map.get(ans.question_id, set())
        )

        total = len(quiz.questions)
        score_percent = (correct / total) * 100 if total > 0 else 0

        return SubmitResult(total=total, correct=correct, score_percent=score_percent)

@app.get("/wordgames")
def list_puzzles(search: Optional[str] = Query(None), category: Optional[str] = Query(None)):
    with get_session() as s:
        q = s.query(Puzzle)
        if search:
            q = q.filter(Puzzle.title.ilike(f"%{search}%"))
        if category:
            # PERBAIKAN: Menggunakan func.lower() untuk filter case-insensitive
            q = q.filter(func.lower(Puzzle.category) == category.lower())
            
        puzzles = q.all()
        return [
            {"id": p.id, "title": p.title, "category": p.category, "description": p.description}
            for p in puzzles
        ]

# --- Detail puzzle (grid + words) ---
@app.get("/wordgames/{puzzle_id}")
def get_puzzle(puzzle_id: int):
    with get_session() as s:
        p = s.query(Puzzle).filter(Puzzle.id == puzzle_id).first()
        if not p:
            raise HTTPException(status_code=404, detail="Puzzle tidak ditemukan")
        return p.to_dict()

# --- Submit found words ---
class PuzzleSubmitPayload(BaseModel):
    found: List[str]

class PuzzleSubmitResult(BaseModel):
    total: int
    found_correct: int
    percent: float

@app.post("/wordgames/{puzzle_id}/submit", response_model=PuzzleSubmitResult)
def submit_puzzle(puzzle_id: int, payload: PuzzleSubmitPayload):
    with get_session() as s:
        p = s.query(Puzzle).filter(Puzzle.id == puzzle_id).first()
        if not p:
            raise HTTPException(status_code=404, detail="Puzzle tidak ditemukan")
        correct_set = {w.word.upper() for w in p.words}
        found_set = {w.upper() for w in payload.found}
        correct_found = len(correct_set & found_set)
        total = len(correct_set)
        percent = (correct_found / total) * 100 if total > 0 else 0.0
        return PuzzleSubmitResult(total=total, found_correct=correct_found, percent=percent)