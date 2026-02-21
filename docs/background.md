# Acorn — Background & Context

## Product

Acorn is an IEP compliance management system for K-12 schools. Its goal is to ensure that schools maintain legal compliance with IEP (Individualized Education Plan) requirements, reducing liability and improving student outcomes.

## Users

- **Customer (buyer):** Principal or school executive
- **Primary user:** Dean of Operations or Registrar — wants school-level compliance visibility
- **Secondary user:** Case Manager (contractor or school employee) — manages multiple students, needs to document their compliance efforts for contract renewal

## The Problem

- Schools bear massive legal liability from undocumented IEP non-compliance
- Almost every meeting falls out of compliance (missing attendees) and schools let it go rather than triggering the required remediation workflow
- The average school spends ~$1M/year settling IEP lawsuits (~$100k per child)
- Nothing is recorded, so schools have no proof of compliance when sued
- If a school tries to discipline a child with an IEP while out of compliance, they immediately open themselves up to a lawsuit

## IEP Requirements

Every student with an IEP requires:
- **4 meetings per year:** 3 IEP Amendment Meetings + 1 Triannual Meeting
- **5 required attendees per meeting:** Case Manager, Student, Credentialed Administrator, Parent, Learning Specialist
- **Triannual meeting:** Results in a signed IEP document submitted to the federal government (submission itself happens outside of Acorn)

### IEP Amendment Meeting
- Ensures required accommodations are being provided
- Updates learning goals and accommodations in the student's IEP

### Triannual Meeting
- Reviews and finalizes the student's full IEP
- Results in a signed IEP submitted federally (manual process outside Acorn)

### Common Accommodations
- Extended time
- Preferential seating (front of class, by window)
- Text-to-speech
- Headphones
- Individualized meetings with the teacher

### The IEP Document
- A formal legal document encoding the student's learning goals, accommodations, progress, and official diagnosis
- For MVP: uploaded as a PDF and attached to the student record
- Future: generated within Acorn

## How a Student Gets an IEP (Onboarding Reasons)

1. **Newly matriculated:** Student transfers in with an existing IEP (often on paper, often lost from their cumulative file)
2. **Recently diagnosed:** Student receives a new diagnosis and parents request an IEP
3. **Ongoing management:** Student was struggling, met with a school psychologist, was diagnosed, and an IEP was created from scratch via an intake meeting

## Compliance Evidence

A meeting is considered compliant when all 5 required attendees were present and proof is attached. Accepted proof:
- Zoom recording link
- Uploaded attendance sheet
- Other supporting documentation

## Out-of-Compliance Remediation

If a meeting is inadequate (missing attendees):
- A rectification process must be initiated
- A new meeting must be scheduled
- If the parent is the missing party, the case manager must make 3 documented outreach attempts

## Scope

- **MVP:** Single school
- **Future:** Multi-school, IEP generation within Acorn, federal submission integration, teacher input form sync (currently an external form sent by the case manager)
