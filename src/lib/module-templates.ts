/**
 * Starter documents for a newly created module, mirroring the structure
 * of the existing ECC module packets. Editors replace the placeholder
 * bullets in the web editor.
 */

export function studentTemplate(number: number, title: string, time: string): string {
  return `# POCUS Module ${number} — ${title}

**Estimated completion time:** ${time}.

## Learning Objectives

By the end of this module, the student will be able to:

- Objective 1.
- Objective 2.
- Objective 3.

## Pre-Session Preparation (Required)

Students are expected to complete the following before the hands-on session.

### Videos

- Source — [Video title](https://example.com)

### Suggested Reading

You can read only one source, these are only suggestions depending on your reading preference.

- Source — [Reading title](https://example.com)

Focus on pattern recognition and concepts — memorization is not expected.

## In-Session Expectations

During the hands-on session, students will:

- Handle the ultrasound probe appropriately and maintain correct orientation.
- Acquire the required views with guidance.
- Apply image-optimization principles (depth, gain, TGC, focus).
- Participate in peer-assisted scanning (learner-to-instructor ratio ≤ 5:1).

## Quick Reference Guide

This section is intended as a bedside reference during the hands-on scanning session.

### Probe & Preset

- **Probe:** …
- **Preset:** …

### Key Views / Structures

- …

### Normal Findings

- …

### Common Pathology / Key Artifacts

- …

### Image Optimization Tips

- **Depth:** …
- **Gain:** …

### Common Pitfalls

- …

### Clinical Pearl of the Day

…

## References

Formatted in APA 7th edition. Superscript numbers in the text correspond to the numbered sources below; course and ACEP sources are common to every module.

1. …
`;
}

export function teacherTemplate(number: number, title: string): string {
  return `# Faculty Teaching Notes — Module ${number}: ${title}

This section is for instructors only and should not be released to students.

## Course-Delivery Reminders

- Use a flipped-classroom approach; maximize transducer time in the trainee's hands.
- Have them teach you the anatomy. If you have any doubts as to what you see, please keep them for when the proctor of the session passes by the station to answer the questions.
- Frequently rotate between students during the session for spaced repetition.

## Emphasize

- …

## Demonstrate

- …

## Reinforce

- …

## References

1. …
`;
}

export function checklistTemplate(): string {
  return `# Faculty Scanning-Session Checklist

Instructor use only.

**Group:** ____ · **Date:** ________ · **Instructor:** ____________ · **Students per group:** 8 · **Session:** 60 min

Mark each cell: **I** = independent · **A** = acquired with assistance/cues · **—** = not performed.

| Required view / skill — acceptance criterion | S1 | S2 | S3 | S4 | S5 | S6 | S7 | S8 |
| :-- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| **Skill 1** — Acceptance criterion. |  |  |  |  |  |  |  |  |
| **Skill 2** — Acceptance criterion. |  |  |  |  |  |  |  |  |
| **Skill 3** — Acceptance criterion. |  |  |  |  |  |  |  |  |

**If time permits:** …

**Pacing guidance:** keep the probe in the student's hand; demonstrate once, then coach. Prioritize the first rows; lower rows are "core if time." Rotate students in pairs to keep all 8 engaged.
`;
}
