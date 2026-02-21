export const ACCOMMODATION_OPTIONS = [
  "Extended time",
  "Preferential seating",
  "Text-to-speech",
  "Headphones",
  "Individualized meetings",
] as const

export type Accommodation = (typeof ACCOMMODATION_OPTIONS)[number]

export const STUDENT_STATUS_OPTIONS = [
  "Newly matriculated",
  "Existing student",
] as const

export type StudentStatus = (typeof STUDENT_STATUS_OPTIONS)[number]

export const RACE_OPTIONS = [
  "American Indian or Alaska Native",
  "Asian",
  "Black or African American",
  "Hispanic or Latino",
  "Native Hawaiian or Other Pacific Islander",
  "White",
  "Two or More Races",
] as const

export type Race = (typeof RACE_OPTIONS)[number]

export interface Student {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  status: StudentStatus
  iepFileName: string | null
  diagnoses: string
  accommodations: Accommodation[]
  learningGoals: string
  additionalContext: string
  race: Race
  caseManager: string
  createdAt: string
}
