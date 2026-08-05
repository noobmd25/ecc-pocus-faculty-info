import { groq } from "next-sanity";

/**
 * Courses with their modules, shaped exactly like the CourseDef type in
 * src/data/modules.ts. coalesce() guards against half-filled documents.
 */
export const coursesQuery = groq`
*[_type == "course" && defined(slug.current)] | order(order asc, name asc) {
  "slug": slug.current,
  name,
  "fullName": coalesce(fullName, name),
  "available": coalesce(available, false),
  "modules": *[_type == "module" && course._ref == ^._id && defined(slug.current)]
    | order(number asc) {
      "id": _id,
      "slug": slug.current,
      "number": coalesce(number, 0),
      title,
      "description": coalesce(description, ""),
      "time": coalesce(time, "60 min")
    }
}`;

/** The three markdown documents of one module. */
export const moduleDocsQuery = groq`
*[_type == "module"
  && slug.current == $moduleSlug
  && course->slug.current == $courseSlug][0] {
  "student": studentContent,
  "teacher": teacherContent,
  "checklist": checklistContent
}`;
