export const MEETING_TYPES = ["IEP Amendment", "Triannual Review"] as const
export type MeetingType = (typeof MEETING_TYPES)[number]

export const MEETING_STATUSES = [
  "Not Scheduled",
  "Scheduled",
  "Incomplete",
  "Complete",
] as const
export type MeetingStatus = (typeof MEETING_STATUSES)[number]

export const INCOMPLETE_REASONS = ["No Show", "Out of Compliance"] as const
export type IncompleteReason = (typeof INCOMPLETE_REASONS)[number]

export const NO_SHOW_EXPLANATIONS = ["Parent", "Student", "Other"] as const
export type NoShowExplanation = (typeof NO_SHOW_EXPLANATIONS)[number]

export const OUT_OF_COMPLIANCE_EXPLANATIONS = [
  "Not Credentialed",
  "No LEA",
  "No Grade Level Representative",
] as const
export type OutOfComplianceExplanation =
  (typeof OUT_OF_COMPLIANCE_EXPLANATIONS)[number]

export interface Meeting {
  id: string
  studentId: string
  type: MeetingType
  order: number
  targetDate: string
  status: MeetingStatus
  reason: IncompleteReason | null
  explanation: NoShowExplanation | OutOfComplianceExplanation | null
}
