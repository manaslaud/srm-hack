# database.py
from models import Base, engine

def create_database():
    Base.metadata.create_all(bind=engine)
