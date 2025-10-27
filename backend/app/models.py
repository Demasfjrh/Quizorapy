from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Table, Text, DateTime # type: ignore
from sqlalchemy.orm import relationship, declarative_base # type: ignore

Base = declarative_base()

# Association table for many-to-many Quiz <-> Category
quiz_category = Table(
    "quiz_category",
    Base.metadata,
    Column("quiz_id", Integer, ForeignKey("quiz.id"), primary_key=True),
    Column("category_id", Integer, ForeignKey("category.id"), primary_key=True),
)


class Quiz(Base):
    __tablename__ = "quiz"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)

    questions = relationship(
        "Question", back_populates="quiz", cascade="all, delete-orphan"
    )

    categories = relationship(
        "Category",
        secondary=quiz_category,
        back_populates="quizzes",
        lazy="joined",
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "categories": [c.name for c in self.categories],
            "questions": [q.to_dict() for q in self.questions],
        }


class Question(Base):
    __tablename__ = "question"

    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer, ForeignKey("quiz.id"), nullable=False)
    text = Column(String, nullable=False)

    quiz = relationship("Quiz", back_populates="questions")
    choices = relationship(
        "Choice", back_populates="question", cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "text": self.text,
            "quiz_id": self.quiz_id,
            "choices": [c.to_dict() for c in self.choices],
        }


class Choice(Base):
    __tablename__ = "choice"

    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("question.id"), nullable=False)
    text = Column(String, nullable=False)
    is_correct = Column(Boolean, nullable=False, default=False)

    question = relationship("Question", back_populates="choices")

    def to_dict(self):
        return {"id": self.id, "text": self.text, "is_correct": self.is_correct}


class Category(Base):
    __tablename__ = "category"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)

    quizzes = relationship(
        "Quiz",
        secondary=quiz_category,
        back_populates="categories",
    )

    def to_dict(self):
        return {"id": self.id, "name": self.name}
    
class Puzzle(Base):
    __tablename__ = "puzzle"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    category = Column(String, nullable=False)
    description = Column(String, nullable=True)
    # grid_data disimpan sebagai lines dipisah dengan '|', tiap line 10 karakter
    grid_data = Column(Text, nullable=False)

    words = relationship("PuzzleWord", back_populates="puzzle", cascade="all, delete-orphan")

    def grid_lines(self):
        return self.grid_data.split("|") if self.grid_data else []

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "category": self.category,
            "description": self.description,
            "grid": self.grid_lines(),
            "words": [w.word for w in self.words],
        }

class PuzzleWord(Base):
    __tablename__ = "puzzle_word"

    id = Column(Integer, primary_key=True, index=True)
    puzzle_id = Column(Integer, ForeignKey("puzzle.id"), nullable=False)
    word = Column(String, nullable=False)

    puzzle = relationship("Puzzle", back_populates="words")

    def to_dict(self):
        return {"id": self.id, "word": self.word}

