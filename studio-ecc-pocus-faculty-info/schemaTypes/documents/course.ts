import { defineField, defineType } from "sanity";

export const course = defineType({
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Short name",
      description: 'Shown as the section heading on the site, e.g. "ECC I".',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fullName",
      title: "Full name",
      description: 'E.g. "Essentials of Clinical Care I".',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      description:
        "The course segment in module URLs (e.g. ecc-1). Don't change it once links have been shared.",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "available",
      title: "Available",
      description:
        'When off, the course is listed on the site under "Coming later in the curriculum" and its modules are hidden.',
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sort order",
      description: "Courses are listed in ascending order (ECC I = 1).",
      type: "number",
      initialValue: 1,
      validation: (rule) => rule.required().min(0),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "fullName" },
  },
});
