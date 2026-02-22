import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useStudents } from "@/context/StudentsContext"
import { useMeetings } from "@/context/MeetingsContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type {
  Meeting,
  MeetingStatus,
  IncompleteReason,
  NoShowExplanation,
  OutOfComplianceExplanation,
} from "@/types/meeting"
import {
  MEETING_STATUSES,
  INCOMPLETE_REASONS,
  NO_SHOW_EXPLANATIONS,
  OUT_OF_COMPLIANCE_EXPLANATIONS,
} from "@/types/meeting"

export default function StudentDetail() {
  const { id } = useParams<{ id: string }>()
  const { getStudent } = useStudents()
  const { getMeetingsForStudent, updateMeeting, updateMeetingDate } =
    useMeetings()
  const navigate = useNavigate()

  const student = id ? getStudent(id) : undefined
  const meetings = id ? getMeetingsForStudent(id) : []

  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null)

  if (!student) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Student Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          No student exists with this ID.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate("/students")}
        >
          Back to Students
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate("/students")}
      >
        &larr; Back to Students
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>
            {student.firstName} {student.lastName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Section title="Personal Information">
            <Field label="Date of Birth" value={student.dateOfBirth} />
            <Field label="Race" value={student.race} />
            <Field label="Status">
              <Badge variant="secondary">{student.status}</Badge>
            </Field>
          </Section>

          <Separator />

          <Section title="Academic Information">
            <Field label="Case Manager" value={student.caseManager} />
            <Field
              label="IEP File"
              value={student.iepFileName ?? "None uploaded"}
            />
          </Section>

          <Separator />

          <Section title="Diagnoses">
            <p className="text-sm whitespace-pre-wrap">
              {student.diagnoses || "None provided"}
            </p>
          </Section>

          <Section title="Accommodations">
            {student.accommodations.length > 0 ? (
              <div className="flex gap-1 flex-wrap">
                {student.accommodations.map((a) => (
                  <Badge key={a} variant="outline">
                    {a}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">None selected</p>
            )}
          </Section>

          <Separator />

          <Section title="Learning Goals">
            <p className="text-sm whitespace-pre-wrap">
              {student.learningGoals || "None provided"}
            </p>
          </Section>

          <Section title="Additional Context">
            <p className="text-sm whitespace-pre-wrap">
              {student.additionalContext || "None provided"}
            </p>
          </Section>

          <Separator />

          <Section title="Meeting Schedule">
            {meetings.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Meeting</TableHead>
                    <TableHead>Target Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {meetings.map((meeting) => (
                    <TableRow key={meeting.id}>
                      <TableCell className="font-medium">
                        {meeting.type}
                      </TableCell>
                      <TableCell>{meeting.targetDate}</TableCell>
                      <TableCell>
                        <StatusBadge status={meeting.status} />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingMeeting(meeting)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground">
                No meetings scheduled
              </p>
            )}
          </Section>
        </CardContent>
      </Card>

      {editingMeeting && (
        <MeetingEditDialog
          meeting={editingMeeting}
          onClose={() => setEditingMeeting(null)}
          onSave={(updates, newDate) => {
            updateMeeting(editingMeeting.id, updates)
            if (newDate && newDate !== editingMeeting.targetDate) {
              updateMeetingDate(editingMeeting.id, newDate)
            }
            setEditingMeeting(null)
          }}
        />
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: MeetingStatus }) {
  const variant =
    status === "Complete"
      ? "default"
      : status === "Scheduled"
        ? "secondary"
        : status === "Incomplete"
          ? "destructive"
          : "outline"

  return <Badge variant={variant}>{status}</Badge>
}

function MeetingEditDialog({
  meeting,
  onClose,
  onSave,
}: {
  meeting: Meeting
  onClose: () => void
  onSave: (updates: Partial<Meeting>, newDate?: string) => void
}) {
  const [status, setStatus] = useState<MeetingStatus>(meeting.status)
  const [reason, setReason] = useState<IncompleteReason | null>(
    meeting.reason
  )
  const [explanation, setExplanation] = useState<
    NoShowExplanation | OutOfComplianceExplanation | null
  >(meeting.explanation)
  const [targetDate, setTargetDate] = useState(meeting.targetDate)

  const handleStatusChange = (newStatus: MeetingStatus) => {
    setStatus(newStatus)
    if (newStatus !== "Incomplete") {
      setReason(null)
      setExplanation(null)
    }
  }

  const handleReasonChange = (newReason: IncompleteReason) => {
    setReason(newReason)
    setExplanation(null)
  }

  const handleSave = () => {
    onSave(
      {
        status,
        reason: status === "Incomplete" ? reason : null,
        explanation:
          status === "Incomplete" && reason ? explanation : null,
      },
      targetDate
    )
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {meeting.type}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Target Date</Label>
            <Input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Status</Label>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MEETING_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {status === "Incomplete" && (
            <div>
              <Label>Reason</Label>
              <Select
                value={reason ?? ""}
                onValueChange={(v) =>
                  handleReasonChange(v as IncompleteReason)
                }
              >
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  {INCOMPLETE_REASONS.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {status === "Incomplete" && reason === "No Show" && (
            <div>
              <Label>Explanation</Label>
              <Select
                value={explanation ?? ""}
                onValueChange={(v) =>
                  setExplanation(v as NoShowExplanation)
                }
              >
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select explanation" />
                </SelectTrigger>
                <SelectContent>
                  {NO_SHOW_EXPLANATIONS.map((e) => (
                    <SelectItem key={e} value={e}>
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {status === "Incomplete" && reason === "Out of Compliance" && (
            <div>
              <Label>Explanation</Label>
              <Select
                value={explanation ?? ""}
                onValueChange={(v) =>
                  setExplanation(v as OutOfComplianceExplanation)
                }
              >
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select explanation" />
                </SelectTrigger>
                <SelectContent>
                  {OUT_OF_COMPLIANCE_EXPLANATIONS.map((e) => (
                    <SelectItem key={e} value={e}>
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-2">
        {title}
      </h3>
      {children}
    </div>
  )
}

function Field({
  label,
  value,
  children,
}: {
  label: string
  value?: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex items-baseline gap-2 py-1">
      <span className="text-sm font-medium w-36 shrink-0">{label}</span>
      {children ?? <span className="text-sm">{value}</span>}
    </div>
  )
}
