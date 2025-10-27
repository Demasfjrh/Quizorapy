from sqlmodel import select # type: ignore
from .models import Quiz
from .database import get_session # type: ignore

def get_all_quizzes():
    with get_session() as s:
        return s.exec(select(Quiz)).all()

def get_quiz_by_id(qid: int):
    with get_session() as s:
        q = s.get(Quiz, qid)
        if q:
            for question in q.questions:
                _ = question.choices  # load semua pilihan
        return q
