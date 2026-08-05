import type { StructureResolver } from "sanity/structure";

/**
 * Studio navigation: browse modules per course (the everyday view),
 * with flat course/module lists below for housekeeping.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("ECC POCUS content")
    .items([
      S.listItem()
        .title("Modules by course")
        .child(
          S.documentTypeList("course")
            .title("Pick a course")
            .child((courseId) =>
              S.documentList()
                .title("Modules")
                .apiVersion("2026-08-05")
                .filter('_type == "module" && course._ref == $courseId')
                .params({ courseId })
                .defaultOrdering([{ field: "number", direction: "asc" }])
                .initialValueTemplates([
                  S.initialValueTemplateItem("module-in-course", { courseId }),
                ]),
            ),
        ),
      S.divider(),
      S.documentTypeListItem("course").title("Courses"),
      S.documentTypeListItem("module").title("All modules"),
    ]);
