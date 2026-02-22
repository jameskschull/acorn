from fastapi import APIRouter

from app.api.routes.students import router as students_router

router = APIRouter()
router.include_router(students_router)
