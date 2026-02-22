import { useMemo } from "react"
import { useStudents } from "@/context/StudentsContext"
import { useMeetings } from "@/context/MeetingsContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Dashboard() {
  const { students, getStudent } = useStudents()
  const { meetings } = useMeetings()

  const upcomingMeetings = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const thirtyDaysOut = new Date(today)
    thirtyDaysOut.setDate(thirtyDaysOut.getDate() + 30)

    return meetings
      .filter((m) => {
        const d = new Date(m.targetDate + "T00:00:00")
        return d >= today && d <= thirtyDaysOut
      })
      .sort(
        (a, b) =>
          new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
      )
  }, [meetings])

  const incompleteMeetings = useMemo(() => {
    return meetings.filter((m) => m.status === "Incomplete")
  }, [meetings])

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Students with IEP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{students.length}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Meetings in the Next 30 Days</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingMeetings.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Meeting Type</TableHead>
                  <TableHead>Target Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingMeetings.map((meeting) => {
                  const student = getStudent(meeting.studentId)
                  return (
                    <TableRow key={meeting.id}>
                      <TableCell className="font-medium">
                        {student
                          ? `${student.firstName} ${student.lastName}`
                          : "Unknown"}
                      </TableCell>
                      <TableCell>{meeting.type}</TableCell>
                      <TableCell>{meeting.targetDate}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">
              No meetings scheduled in the next 30 days.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Incomplete Meetings</CardTitle>
            <Badge variant="destructive">{incompleteMeetings.length}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {incompleteMeetings.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Meeting Type</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Target Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incompleteMeetings.map((meeting) => {
                  const student = getStudent(meeting.studentId)
                  return (
                    <TableRow key={meeting.id}>
                      <TableCell className="font-medium">
                        {student
                          ? `${student.firstName} ${student.lastName}`
                          : "Unknown"}
                      </TableCell>
                      <TableCell>{meeting.type}</TableCell>
                      <TableCell>{meeting.reason ?? "—"}</TableCell>
                      <TableCell>{meeting.targetDate}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">
              No incomplete meetings.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
