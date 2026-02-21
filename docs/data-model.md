# Acorn — Data Model

## Entities

### Student
Central entity. Each student with an IEP has one active IEP record and a set of stakeholders.

Fields (minimum):
- Name
- IEP status (active/inactive)
- Onboarding reason: `newly_matriculated` | `recently_diagnosed` | `ongoing_management`

---

### IEP
One per student. The legal document encoding the student's current state.

Linked to:
- Diagnosis
- Accommodations (one or many)
- Learning Goals (one or many)
- Uploaded PDF (for MVP; generated in future)

---

### Diagnosis
The official diagnosis that warrants the IEP.

---

### Accommodations
What the school is legally required to provide. Common values:
- Extended time
- Preferential seating (front of class)
- Preferential seating (by window)
- Text-to-speech
- Headphones
- Individualized meetings with the teacher

---

### Learning Goals
The student's documented learning objectives, updated at each IEP amendment meeting.

---

### Stakeholder
People associated with a student's IEP. Each meeting requires one of each role.

Roles:
- `parent`
- `case_manager`
- `learning_specialist`
- `credentialed_administrator`

Note: The student themselves is also a required meeting attendee but is not a "stakeholder" in this model.

---

### Scheduled IEP Meeting
Represents a planned or completed meeting for a student.

Fields:
- **Type:** `iep_amendment` | `triannual`
- **Status:** `not_scheduled` | `scheduled` | `occurred_adequate` | `occurred_inadequate`
- **Scheduled date/time**
- **Participants recorded** (which of the 5 required roles attended)
- **Proof of meeting:** Zoom recording link and/or uploaded attendance sheet
- **Preparatory materials**
- **Notes / IEP changes recorded at this meeting**

Each student has 4 scheduled meetings per academic year (auto-initialized on onboarding):
- 3 × IEP Amendment Meetings
- 1 × Triannual Meeting

---

### Outreach Attempt
Tracks documented follow-up attempts when a meeting is out of compliance (especially for parent no-shows).

Fields:
- Meeting reference
- Attempt number (1, 2, or 3)
- Date
- Method / notes
