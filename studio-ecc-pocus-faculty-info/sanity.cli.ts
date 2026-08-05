import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "8i37d72u",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  autoUpdates: true,
});
