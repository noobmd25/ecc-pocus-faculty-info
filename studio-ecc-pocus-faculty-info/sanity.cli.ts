import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "8i37d72u",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  autoUpdates: true,
  // Pins the deployed Studio at ecc-pocus-faculty-info.sanity.studio, so
  // `sanity deploy` never prompts for an application id again.
  deployment: {
    appId: "sqaflg2hunyet0yi7z63802f",
  },
});
