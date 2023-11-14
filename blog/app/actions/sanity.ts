"use server";

import { PostDeref } from "@/post/[slug]/page";
import { client } from "@/sanity/client";

export type PostSearchResult = Pick<PostDeref, "title" | "slug">;

export async function searchPosts(query?: string): Promise<Array<PostSearchResult>> {
  const score = `boost(title match "*${query}*", 4), subheading match "*${query}*", metaDescription match "*${query}*", pt::text(body) match "*${query}*"`;

  const sanityQuery = `*[_type == "post"] | ${
    query !== undefined
      ? `score(${score}) | order(_score desc)`
      : "order(_createdAt desc)"
  } {
      title,
      slug,
      _score,
    }`;

  const results = await client.fetch<Array<PostSearchResult>>(sanityQuery);

  return results;
}
