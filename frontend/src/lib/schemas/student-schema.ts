import { z } from "zod"
import {
  ACCOMMODATION_OPTIONS,
  RACE_OPTIONS,
  STUDENT_STATUS_OPTIONS,
} from "@/types/student"

export const studentFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  status: z.enum(STUDENT_STATUS_OPTIONS, {
    message: "Please select a student status",
  }),
  iepFileName: z.string().nullable(),
  diagnoses: z.string(),
  accommodations: z.array(z.enum(ACCOMMODATION_OPTIONS)),
  learningGoals: z.string(),
  additionalContext: z.string(),
  race: z.enum(RACE_OPTIONS, {
    message: "Please select a race",
  }),
  caseManager: z.string().min(1, "Case manager is required"),
})

export type StudentFormValues = z.infer<typeof studentFormSchema>
