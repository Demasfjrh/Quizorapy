from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

class Quiz(Base):
    __tablename__ = "quiz"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)

    questions = relationship("Question", back_populates="quiz", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "questions": [q.to_dict() for q in self.questions]
        }


class Question(Base):
    __tablename__ = "question"

    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer, ForeignKey("quiz.id"), nullable=False)
    text = Column(String, nullable=False)

    quiz = relationship("Quiz", back_populates="questions")
    choices = relationship("Choice", back_populates="question", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "text": self.text,
            "quiz_id": self.quiz_id,
            "choices": [c.to_dict() for c in self.choices]
        }


class Choice(Base):
    __tablename__ = "choice"

    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("question.id"), nullable=False)
    text = Column(String, nullable=False)
    is_correct = Column(Boolean, nullable=False, default=False)

    question = relationship("Question", back_populates="choices")

    def to_dict(self):
        return {
            "id": self.id,
            "text": self.text,
            "is_correct": self.is_correct
        }
