import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import {
  studentFormSchema,
  type StudentFormValues,
} from "@/lib/schemas/student-schema"
import { useStudents } from "@/context/StudentsContext"
import { useMeetings } from "@/context/MeetingsContext"
import { createMeetingSchedule } from "@/lib/meetings"
import {
  ACCOMMODATION_OPTIONS,
  STUDENT_STATUS_OPTIONS,
  RACE_OPTIONS,
} from "@/types/student"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

export default function OnboardStudent() {
  const navigate = useNavigate()
  const { addStudent } = useStudents()
  const { addMeetingsForStudent } = useMeetings()

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      status: undefined,
      iepFileName: null,
      diagnoses: "",
      accommodations: [],
      learningGoals: "",
      additionalContext: "",
      race: undefined,
      caseManager: "",
    },
  })

  async function onSubmit(values: StudentFormValues) {
    const student = await addStudent({
      ...values,
      iepFileName: values.iepFileName ?? null,
      diagnoses: values.diagnoses ?? "",
      learningGoals: values.learningGoals ?? "",
      additionalContext: values.additionalContext ?? "",
    })
    addMeetingsForStudent(createMeetingSchedule(student.id, student.createdAt))
    navigate("/students")
  }

  return (
    <div className="p-6 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Onboard Student</CardTitle>
          <CardDescription>
            Fill out the form below to onboard a new student.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              {/* Student Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Status</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        {STUDENT_STATUS_OPTIONS.map((option) => (
                          <div
                            key={option}
                            className="flex items-center gap-2"
                          >
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option}>{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* IEP Upload */}
              <FormField
                control={form.control}
                name="iepFileName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Existing IEP (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          field.onChange(file ? file.name : null)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              {/* Diagnoses */}
              <FormField
                control={form.control}
                name="diagnoses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diagnoses</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter diagnoses..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Accommodations */}
              <FormField
                control={form.control}
                name="accommodations"
                render={() => (
                  <FormItem>
                    <FormLabel>Accommodations</FormLabel>
                    <div className="grid gap-2">
                      {ACCOMMODATION_OPTIONS.map((option) => (
                        <FormField
                          key={option}
                          control={form.control}
                          name="accommodations"
                          render={({ field }) => (
                            <FormItem className="flex items-center gap-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(option)}
                                  onCheckedChange={(checked) => {
                                    const current = field.value ?? []
                                    field.onChange(
                                      checked
                                        ? [...current, option]
                                        : current.filter(
                                            (v) => v !== option
                                          )
                                    )
                                  }}
                                />
                              </FormControl>
                              <Label className="font-normal">
                                {option}
                              </Label>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              {/* Learning Goals */}
              <FormField
                control={form.control}
                name="learningGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Learning Goals</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter learning goals..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Additional Context */}
              <FormField
                control={form.control}
                name="additionalContext"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Context</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any additional context..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              {/* Race */}
              <FormField
                control={form.control}
                name="race"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Race</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select race" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {RACE_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Case Manager */}
              <FormField
                control={form.control}
                name="caseManager"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Case Manager</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter case manager name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Onboard Student
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
