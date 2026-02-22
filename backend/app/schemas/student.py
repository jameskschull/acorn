from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Dict, List, Optional

from pydantic import BaseModel, Field


class AccommodationEnum(str, Enum):
    extended_time = "Extended time"
    preferential_seating = "Preferential seating"
    text_to_speech = "Text-to-speech"
    headphones = "Headphones"
    individualized_meetings = "Individualized meetings"


class StudentStatusEnum(str, Enum):
    newly_matriculated = "Newly matriculated"
    existing_student = "Existing student"


class RaceEnum(str, Enum):
    american_indian = "American Indian or Alaska Native"
    asian = "Asian"
    black = "Black or African American"
    hispanic = "Hispanic or Latino"
    native_hawaiian = "Native Hawaiian or Other Pacific Islander"
    white = "White"
    two_or_more = "Two or More Races"


class StudentCreate(BaseModel):
    first_name: str = Field(..., min_length=1, alias="firstName")
    last_name: str = Field(..., min_length=1, alias="lastName")
    date_of_birth: str = Field(..., min_length=1, alias="dateOfBirth")
    status: StudentStatusEnum
    iep_file_name: Optional[str] = Field(None, alias="iepFileName")
    diagnoses: str = ""
    accommodations: List[AccommodationEnum] = []
    learning_goals: str = Field("", alias="learningGoals")
    additional_context: str = Field("", alias="additionalContext")
    race: RaceEnum
    case_manager: str = Field(..., min_length=1, alias="caseManager")

    model_config = {"populate_by_name": True}


class StudentResponse(BaseModel):
    id: str
    first_name: str
    last_name: str
    date_of_birth: str
    status: str
    iep_file_name: Optional[str]
    diagnoses: str
    accommodations: List[str]
    learning_goals: str
    additional_context: str
    race: str
    case_manager: str
    created_at: datetime

    model_config = {"from_attributes": True}

    def to_frontend(self) -> Dict:
        """Convert to camelCase keys matching the frontend Student interface."""
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "dateOfBirth": self.date_of_birth,
            "status": self.status,
            "iepFileName": self.iep_file_name,
            "diagnoses": self.diagnoses,
            "accommodations": self.accommodations,
            "learningGoals": self.learning_goals,
            "additionalContext": self.additional_context,
            "race": self.race,
            "caseManager": self.case_manager,
            "createdAt": self.created_at.isoformat(),
        }
