import { client } from "@/sanity/client";
import { Link } from "@nextui-org/link";

export default async function Home() {
  const posts = await client.fetch<Array<{ title: string; slug: { current: string } }>>(
    `*[_type == "post"]{
      title,
      slug
    }`,
  );
  return (
    <main>
      Posts
      <ul>
        {posts.map((post) => (
          <li key={post.title}>
            <Link href={`/post/${post.slug.current}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
