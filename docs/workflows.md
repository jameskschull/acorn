# Acorn — Workflows

## Dean of Operations

### Workflow: Checking Student Population Compliance Status

The Dean logs in to get a school-wide view of IEP compliance.

**What they need to see:**
1. All students with current IEP accommodations
2. Students categorized by onboarding reason: newly matriculated, recently diagnosed, ongoing management
3. For each student: their diagnosis and accommodations
4. Status of each scheduled IEP meeting
5. For each meeting:
   - Whether it was in compliance
   - If **compliant:** which stakeholders attended and what IEP changes occurred
   - If **non-compliant:** why it wasn't compliant and what remediation steps have been taken

---

## Case Manager

### Workflow 1: Onboard New Student

1. Add student to system
2. Select reason for onboarding (`newly_matriculated` | `recently_diagnosed` | `ongoing_management`)
3. Upload existing IEP PDF (if applicable)
4. Enter diagnosis, accommodations, and learning goals
5. System auto-initializes the year's 4 scheduled meetings for the student (3 amendments + 1 triannual)

---

### Workflow 2: Record Meeting & Document IEP Changes

1. Select student
2. Select the scheduled meeting
3. Record which participants attended (all 5 roles)
4. Attach proof of meeting (Zoom link and/or attendance sheet upload)
5. Record any changes to diagnosis, accommodations, or learning goals
6. Review updated IEP for formal reporting

**Outcome:** Meeting status updated to `occurred_adequate` or `occurred_inadequate` based on whether all 5 roles attended and proof was attached.

---

### Workflow 3: Manage Out-of-Compliance Meeting

Triggered when a meeting is marked `occurred_inadequate`, either:
- Automatically (system detects missing attendees or proof), or
- Manually (case manager records that the meeting was inadequate)

Steps:
1. Case manager is notified / records the inadequacy
2. Rectification process is generated
3. New meeting is scheduled
4. Reminders sent to parent and other stakeholders
5. If parent is the missing party: document 3 outreach attempts before escalation

---

### Workflow 4: Scheduling

1. Case manager sees that an upcoming meeting needs to be scheduled
2. Reaches out to parents and stakeholders to coordinate
3. Records meeting status as `scheduled` with date/time
4. Sends teacher input request form (external form, future sync to Acorn)

---

### Workflow 5: Reporting (Federal Submission)

1. Select student
2. Review current IEP (uploaded PDF for MVP; generated document in future)
3. Submit to federal government (manual process outside Acorn)

---

## Out of Scope for MVP

- Multi-school views
- IEP document generation within Acorn
- Federal submission integration
- Teacher input form sync (external form for now)
