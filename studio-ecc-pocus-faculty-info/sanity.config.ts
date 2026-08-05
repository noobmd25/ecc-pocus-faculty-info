import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { markdownSchema } from "sanity-plugin-markdown";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "8i37d72u";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "ECC POCUS Modules",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) => [
      ...templates,
      {
        id: "module-in-course",
        title: "Module in this course",
        schemaType: "module",
        parameters: [{ name: "courseId", title: "Course ID", type: "string" }],
        value: ({ courseId }: { courseId: string }) => ({
          course: { _type: "reference", _ref: courseId },
        }),
      },
    ],
  },
  plugins: [structureTool({ structure }), visionTool(), markdownSchema()],
});
