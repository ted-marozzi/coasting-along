import { createClient } from "@sanity/client";

export const clientConfig = {
  projectId: "xs05oous",
  dataset: "production",
  apiVersion: "2021-08-31",
  useCdn: process.env.NODE_ENV === "production",
  perspective: process.env.NODE_ENV === "production" ? "published" : "previewDrafts",
} as const;

export const client = createClient(clientConfig);
