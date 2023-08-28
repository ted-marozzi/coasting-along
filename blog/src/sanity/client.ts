import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "xs05oous",
  dataset: "production",
  apiVersion: "2021-08-31",
  useCdn: false,
});
