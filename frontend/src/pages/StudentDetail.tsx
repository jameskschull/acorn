import { useParams, useNavigate } from "react-router-dom"
import { useStudents } from "@/context/StudentsContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function StudentDetail() {
  const { id } = useParams<{ id: string }>()
  const { getStudent } = useStudents()
  const navigate = useNavigate()

  const student = id ? getStudent(id) : undefined

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
        </CardContent>
      </Card>
    </div>
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
