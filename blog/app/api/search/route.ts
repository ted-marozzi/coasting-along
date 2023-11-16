import { client } from "@/sanity/client";
export type PostSearchResult = Pick<any, "title" | "slug">;

export const runtime = "edge";

const route = `[api/search]`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") ?? undefined;

  console.debug(route, `query ${query}`);

  const score = `boost(title match "*${query}*", 4), subheading match "*${query}*", metaDescription match "*${query}*", pt::text(body) match "*${query}*"`;

  const sanityQuery = `*[_type == "post"] | ${
    query !== undefined
      ? `score(${score}) | order(_score desc)`
      : "order(_createdAt desc)"
  } {
      title,
      slug,
      _score,
    }[_score > 0]`;

  const results = await client.fetch<Array<PostSearchResult>>(sanityQuery);

  console.debug(route, `query ${query} returning ${results.length} results`);

  return Response.json({ results });
}
