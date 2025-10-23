from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from app.db import get_session
from app.models import Quiz, Question, Choice

app = FastAPI(title="Quiz Game API", version="1.0.0")

# ✅ Izinkan akses dari frontend (misal React/Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ubah ke domain frontend kalau sudah deploy
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 🏠 Homepage Info
@app.get("/")
def homepage():
    return {
        "message": "Selamat datang di Quiz Game API 🎮",
        "routes": {
            "/quiz": "Daftar semua quiz",
            "/quiz/{quiz_id}": "Detail quiz + semua pertanyaan",
            "/quiz/{quiz_id}/question/{number}": "Pertanyaan berdasarkan urutan",
        },
    }


# 📋 Ambil semua quiz
@app.get("/quiz")
def get_quizzes():
    with get_session() as session:
        quizzes = session.query(Quiz).all()
        return [
            {
                "id": q.id,
                "title": q.title,
                "description": q.description,
                "question_count": len(q.questions),
            }
            for q in quizzes
        ]


# 🧠 Ambil detail quiz beserta semua pertanyaan
@app.get("/quiz/{quiz_id}")
def get_quiz(quiz_id: int):
    with get_session() as session:
        quiz = session.query(Quiz).filter(Quiz.id == quiz_id).first()
        if not quiz:
            raise HTTPException(status_code=404, detail="Quiz tidak ditemukan")

        return {
            "id": quiz.id,
            "title": quiz.title,
            "description": quiz.description,
            "questions": [
                {
                    "id": q.id,
                    "text": q.text,
                    "options": [
                        {"id": c.id, "text": c.text}
                        for c in q.choices
                    ],
                }
                for q in quiz.questions
            ],
        }


# 🎯 Ambil pertanyaan berdasarkan nomor urutan (untuk mode 1 per 1 seperti Kahoot)
@app.get("/quiz/{quiz_id}/question/{number}")
def get_question(quiz_id: int, number: int):
    with get_session() as session:
        quiz = session.query(Quiz).filter(Quiz.id == quiz_id).first()
        if not quiz:
            raise HTTPException(status_code=404, detail="Quiz tidak ditemukan")

        questions = quiz.questions
        if number < 1 or number > len(questions):
            raise HTTPException(status_code=404, detail="Nomor pertanyaan tidak valid")

        question = questions[number - 1]

        return {
            "quiz_id": quiz.id,
            "quiz_title": quiz.title,
            "question_number": number,
            "question_text": question.text,
            "options": [
                {"id": c.id, "text": c.text}
                for c in question.choices
            ],
        }

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
    with get_session() as session:
        quiz = session.query(Quiz).filter(Quiz.id == quiz_id).first()
        if not quiz:
            raise HTTPException(status_code=404, detail="Quiz tidak ditemukan")

        # buat map question_id -> set(choice_id benar)
        correct_map = {}
        for q in quiz.questions:
            correct_ids = [c.id for c in q.choices if c.is_correct]
            correct_map[q.id] = set(correct_ids)

        total = len(quiz.questions)
        correct = 0
        for ans in payload.answers:
            if ans.question_id in correct_map and ans.choice_id in correct_map[ans.question_id]:
                correct += 1

        score_percent = (correct / total) * 100 if total > 0 else 0.0
        return SubmitResult(total=total, correct=correct, score_percent=score_percent)