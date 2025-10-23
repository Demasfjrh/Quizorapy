from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Base

DATABASE_URL = "sqlite:///quiz.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)

def get_session():
    return SessionLocal()

def init_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
