import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import type { Student } from "@/types/student"

const STORAGE_KEY = "acorn_students"

interface StudentsContextValue {
  students: Student[]
  addStudent: (student: Student) => void
  getStudent: (id: string) => Student | undefined
}

const StudentsContext = createContext<StudentsContextValue | null>(null)

function loadStudents(): Student[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function StudentsProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>(loadStudents)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students))
  }, [students])

  const addStudent = useCallback((student: Student) => {
    setStudents((prev) => [...prev, student])
  }, [])

  const getStudent = useCallback(
    (id: string) => students.find((s) => s.id === id),
    [students]
  )

  return (
    <StudentsContext.Provider value={{ students, addStudent, getStudent }}>
      {children}
    </StudentsContext.Provider>
  )
}

export function useStudents() {
  const ctx = useContext(StudentsContext)
  if (!ctx) {
    throw new Error("useStudents must be used within a StudentsProvider")
  }
  return ctx
}
