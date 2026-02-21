import { useNavigate } from "react-router-dom"
import { useStudents } from "@/context/StudentsContext"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function Students() {
  const { students } = useStudents()
  const navigate = useNavigate()

  if (students.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Students</h1>
        <p className="mt-4 text-muted-foreground">
          No students onboarded yet.{" "}
          <Button
            variant="link"
            className="px-0"
            onClick={() => navigate("/onboard")}
          >
            Onboard a student
          </Button>
        </p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Students</h1>
        <Button onClick={() => navigate("/onboard")}>Add Student</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Race</TableHead>
            <TableHead>Case Manager</TableHead>
            <TableHead>Accommodations</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow
              key={student.id}
              className="cursor-pointer"
              onClick={() => navigate(`/students/${student.id}`)}
            >
              <TableCell className="font-medium">
                {student.firstName} {student.lastName}
              </TableCell>
              <TableCell>{student.dateOfBirth}</TableCell>
              <TableCell>
                <Badge variant="secondary">{student.status}</Badge>
              </TableCell>
              <TableCell>{student.race}</TableCell>
              <TableCell>{student.caseManager}</TableCell>
              <TableCell>
                <div className="flex gap-1 flex-wrap">
                  {student.accommodations.map((a) => (
                    <Badge key={a} variant="outline">
                      {a}
                    </Badge>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
