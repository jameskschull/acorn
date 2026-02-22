from __future__ import annotations

import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import JSON, DateTime, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base


class Student(Base):
    __tablename__ = "students"

    id: Mapped[str] = mapped_column(
        String, primary_key=True, default=lambda: str(uuid.uuid4())
    )
    first_name: Mapped[str] = mapped_column(String, nullable=False)
    last_name: Mapped[str] = mapped_column(String, nullable=False)
    date_of_birth: Mapped[str] = mapped_column(String, nullable=False)
    status: Mapped[str] = mapped_column(String, nullable=False)
    iep_file_name: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    diagnoses: Mapped[str] = mapped_column(Text, default="")
    accommodations: Mapped[list] = mapped_column(JSON, default=list)
    learning_goals: Mapped[str] = mapped_column(Text, default="")
    additional_context: Mapped[str] = mapped_column(Text, default="")
    race: Mapped[str] = mapped_column(String, nullable=False)
    case_manager: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow
    )
