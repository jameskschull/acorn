import type { Meeting, MeetingType } from "@/types/meeting"

function addMonths(dateStr: string, months: number): string {
  const date = new Date(dateStr)
  date.setMonth(date.getMonth() + months)
  return date.toISOString().split("T")[0]
}

const MEETING_SEQUENCE: MeetingType[] = [
  "IEP Amendment",
  "IEP Amendment",
  "IEP Amendment",
  "Triannual Review",
]

export function createMeetingSchedule(
  studentId: string,
  onboardedDate: string
): Meeting[] {
  const firstDate = addMonths(onboardedDate, 1)

  return MEETING_SEQUENCE.map((type, index) => ({
    id: crypto.randomUUID(),
    studentId,
    type,
    order: index,
    targetDate: addMonths(firstDate, index * 3),
    status: "Not Scheduled",
    reason: null,
    explanation: null,
  }))
}

export function cascadeMeetingDates(
  meetings: Meeting[],
  changedMeetingId: string,
  newDate: string
): Meeting[] {
  const sorted = [...meetings].sort((a, b) => a.order - b.order)
  const changedIndex = sorted.findIndex((m) => m.id === changedMeetingId)
  if (changedIndex === -1) return meetings

  const result: Meeting[] = []
  for (let i = 0; i < sorted.length; i++) {
    if (i < changedIndex) {
      result.push(sorted[i])
    } else if (i === changedIndex) {
      result.push({ ...sorted[i], targetDate: newDate })
    } else {
      result.push({
        ...sorted[i],
        targetDate: addMonths(result[i - 1].targetDate, 3),
      })
    }
  }
  return result
}
