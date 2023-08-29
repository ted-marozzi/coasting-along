import { Container } from "@/ui/container";
import { client } from "@/sanity/client";
import { Link } from "@nextui-org/link";
import { Content } from "@/ui/content";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Coasting Along",
  description:
    "Join Ruby and Ted on Coasting Along as they explore Australia from coast to coaster. Discover travel adventures, remote work tips, surfing spots, and mouth-watering food experiences.",
};

export default async function Home() {
  const posts = await client.fetch<Array<{ title: string; slug: { current: string } }>>(
    `*[_type == "post"]{
      title,
      slug
    }`,
  );

  return (
    <Container>
      <Content>
        <ul>
          {posts.map((post) => (
            <li key={post.title}>
              <Link
                className="text-blue-600"
                color="primary"
                href={`/post/${post.slug.current}`}
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </Content>
    </Container>
  );
}
