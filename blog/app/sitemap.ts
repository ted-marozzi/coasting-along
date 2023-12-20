import { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { baseUrl } from "@/base";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (
    await client.fetch<Array<{ slug: { current: string } }>>(
      `*[_type == "post"]{
      slug
    }`,
    )
  ).map((post) => ({ url: `${baseUrl}/${post.slug.current}`, lastModified: new Date() }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/authors`,
      lastModified: new Date(),
    },
    ...posts,
  ];
}
