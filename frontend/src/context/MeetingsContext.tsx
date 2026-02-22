import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import type { Meeting } from "@/types/meeting"
import { cascadeMeetingDates } from "@/lib/meetings"

const STORAGE_KEY = "acorn_meetings"

interface MeetingsContextValue {
  meetings: Meeting[]
  addMeetingsForStudent: (meetings: Meeting[]) => void
  getMeetingsForStudent: (studentId: string) => Meeting[]
  updateMeeting: (meetingId: string, updates: Partial<Meeting>) => void
  updateMeetingDate: (meetingId: string, newDate: string) => void
}

const MeetingsContext = createContext<MeetingsContextValue | null>(null)

function loadMeetings(): Meeting[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function MeetingsProvider({ children }: { children: ReactNode }) {
  const [meetings, setMeetings] = useState<Meeting[]>(loadMeetings)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings))
  }, [meetings])

  const addMeetingsForStudent = useCallback((newMeetings: Meeting[]) => {
    setMeetings((prev) => [...prev, ...newMeetings])
  }, [])

  const getMeetingsForStudent = useCallback(
    (studentId: string) =>
      meetings
        .filter((m) => m.studentId === studentId)
        .sort((a, b) => a.order - b.order),
    [meetings]
  )

  const updateMeeting = useCallback(
    (meetingId: string, updates: Partial<Meeting>) => {
      setMeetings((prev) =>
        prev.map((m) => (m.id === meetingId ? { ...m, ...updates } : m))
      )
    },
    []
  )

  const updateMeetingDate = useCallback(
    (meetingId: string, newDate: string) => {
      setMeetings((prev) => {
        const meeting = prev.find((m) => m.id === meetingId)
        if (!meeting) return prev

        const studentMeetings = prev.filter(
          (m) => m.studentId === meeting.studentId
        )
        const otherMeetings = prev.filter(
          (m) => m.studentId !== meeting.studentId
        )
        const updated = cascadeMeetingDates(studentMeetings, meetingId, newDate)
        return [...otherMeetings, ...updated]
      })
    },
    []
  )

  return (
    <MeetingsContext.Provider
      value={{
        meetings,
        addMeetingsForStudent,
        getMeetingsForStudent,
        updateMeeting,
        updateMeetingDate,
      }}
    >
      {children}
    </MeetingsContext.Provider>
  )
}

export function useMeetings() {
  const ctx = useContext(MeetingsContext)
  if (!ctx) {
    throw new Error("useMeetings must be used within a MeetingsProvider")
  }
  return ctx
}
