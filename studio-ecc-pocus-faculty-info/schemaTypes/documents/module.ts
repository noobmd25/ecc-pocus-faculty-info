import { defineField, defineType } from "sanity";

export const module = defineType({
  name: "module",
  title: "Module",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Module title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "course",
      title: "Course",
      type: "reference",
      to: [{ type: "course" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      description:
        "The module segment in URLs (e.g. foundations). Don't change it once links have been shared.",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "number",
      title: "Module number",
      description: "Modules are listed in ascending order within a course.",
      type: "number",
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: "description",
      title: "One-sentence description",
      description: "Shown on the module card in the site index.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "time",
      title: "Estimated student prep time",
      type: "string",
      initialValue: "60 min",
    }),
    defineField({
      name: "studentContent",
      title: "Student module",
      description: "The pre-session reading assigned to students.",
      type: "markdown",
    }),
    defineField({
      name: "teacherContent",
      title: "Teacher module",
      description: "Facilitator notes shown on the teacher page.",
      type: "markdown",
    }),
    defineField({
      name: "checklistContent",
      title: "Scanning-session checklist",
      description:
        "Appended to the teacher page in its own panel. Usually a table with one column per student (S1–S8).",
      type: "markdown",
    }),
  ],
  orderings: [
    {
      title: "Module number",
      name: "numberAsc",
      by: [{ field: "number", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", number: "number", courseName: "course.name" },
    prepare({ title, number, courseName }) {
      return {
        title: number ? `${number}. ${title}` : title,
        subtitle: courseName,
      };
    },
  },
});
