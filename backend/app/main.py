from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.db import get_session
from app.models import Quiz, Question, Choice

app = FastAPI()

# ✅ Izinkan akses dari frontend (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # atau ganti jadi alamat frontend-mu
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/quiz")
def get_quizzes():
    with get_session() as session:
        quizzes = session.query(Quiz).all()
        return [
            {"id": q.id, "title": q.title, "description": q.description}
            for q in quizzes
        ]

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
                        {"id": c.id, "text": c.text, "is_correct": c.is_correct}
                        for c in q.choices
                    ],
                }
                for q in quiz.questions
            ],
        }
