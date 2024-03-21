# crud.py
from sqlalchemy.orm import Session
from models import Loan

def create_loan(db: Session, loan_data):
    db_loan = Loan(**loan_data)
    db.add(db_loan)
    db.commit()
    db.refresh(db_loan)
    return db_loan
