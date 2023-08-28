import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import robotsTxt from "astro-robots-txt";
import siteMap from "astro-sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.coastingalong.blog",
  integrations: [
    sanity({
      projectId: "xs05oous",
      dataset: "production",
      apiVersion: "2023-02-08",
      useCdn: false,
    }),
    robotsTxt(),
    siteMap(),
  ],
});
