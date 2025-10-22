from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

# ---------------------------
# Model: Quiz
# ---------------------------
class Quiz(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None

    questions: List["Question"] = Relationship(back_populates="quiz")


# ---------------------------
# Model: Question
# ---------------------------
class Question(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    quiz_id: int = Field(foreign_key="quiz.id")
    text: str

    quiz: Optional[Quiz] = Relationship(back_populates="questions")
    choices: List["Choice"] = Relationship(back_populates="question")


# ---------------------------
# Model: Choice
# ---------------------------
class Choice(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    question_id: int = Field(foreign_key="question.id")
    text: str
    is_correct: bool

    # 🔧 Inilah yang hilang sebelumnya:
    question: Optional[Question] = Relationship(back_populates="choices")
