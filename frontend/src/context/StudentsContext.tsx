import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import type { Student } from "@/types/student"

interface StudentsContextValue {
  students: Student[]
  addStudent: (data: Omit<Student, "id" | "createdAt">) => Promise<Student>
  getStudent: (id: string) => Student | undefined
  loading: boolean
}

const StudentsContext = createContext<StudentsContextValue | null>(null)

export function StudentsProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const addStudent = useCallback(
    async (data: Omit<Student, "id" | "createdAt">): Promise<Student> => {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        throw new Error("Failed to create student")
      }
      const student: Student = await res.json()
      setStudents((prev) => [student, ...prev])
      return student
    },
    []
  )

  const getStudent = useCallback(
    (id: string) => students.find((s) => s.id === id),
    [students]
  )

  return (
    <StudentsContext.Provider value={{ students, addStudent, getStudent, loading }}>
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
