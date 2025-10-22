from app.db import get_session, init_db
from app.models import Quiz, Question, Choice

def seed():
    init_db()
    q = Quiz(title="Quiz Python Dasar", description="Tes pengetahuan dasar Python")
    q.questions = [
        Question(text="Apa kepanjangan dari 'Py'?", choices=[
            Choice(text="Python", is_correct=True),
            Choice(text="Pyramid", is_correct=False),
            Choice(text="PyTest", is_correct=False),
        ]),
        Question(text="Tipe data teks di Python?", choices=[
            Choice(text="int", is_correct=False),
            Choice(text="str", is_correct=True),
            Choice(text="bool", is_correct=False),
        ]),
    ]
    with get_session() as s:
        s.add(q)
        s.commit()

if __name__ == "__main__":
    seed()
