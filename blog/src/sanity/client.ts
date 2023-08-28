import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "xs05oous",
  dataset: "production",
  useCdn: false,
});
