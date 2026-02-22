from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.student import Student
from app.schemas.student import StudentCreate, StudentResponse

router = APIRouter(prefix="/students", tags=["students"])


@router.post("", status_code=201)
def create_student(payload: StudentCreate, db: Session = Depends(get_db)):
    student = Student(
        first_name=payload.first_name,
        last_name=payload.last_name,
        date_of_birth=payload.date_of_birth,
        status=payload.status.value,
        iep_file_name=payload.iep_file_name,
        diagnoses=payload.diagnoses,
        accommodations=[a.value for a in payload.accommodations],
        learning_goals=payload.learning_goals,
        additional_context=payload.additional_context,
        race=payload.race.value,
        case_manager=payload.case_manager,
    )
    db.add(student)
    db.commit()
    db.refresh(student)
    return StudentResponse.model_validate(student).to_frontend()


@router.get("")
def list_students(db: Session = Depends(get_db)):
    students = db.query(Student).order_by(Student.created_at.desc()).all()
    return [StudentResponse.model_validate(s).to_frontend() for s in students]


@router.get("/{student_id}")
def get_student(student_id: str, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return StudentResponse.model_validate(student).to_frontend()
