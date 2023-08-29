import { Container } from "@/ui/container";
import { client } from "@/sanity/client";
import { Link } from "@nextui-org/link";
import { Content } from "@/ui/content";
import { Metadata } from "next/types";
import { Card } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { urlFor } from "./sanity/image";

import { PostDeref } from "./post/[slug]/page";

export const metadata: Metadata = {
  title: "Coasting Along",
  description:
    "Join Ruby and Ted on Coasting Along as they explore Australia from coast to coaster. Discover travel adventures, remote work tips, surfing spots, and mouth-watering food experiences.",
};

export default async function Home() {
  const posts = await client.fetch<
    Array<Pick<PostDeref, "mainImage" | "title" | "slug" | "categories" | "subheading">>
  >(
    `*[_type == "post"]{
      slug,
      title,
      mainImage,
      subheading,
      categories[]->
    }`,
  );
  return (
    <div>
      <div className="mx-auto flex justify-between items-center flex-wrap">
        {posts.map((post) => (
          <Link key={post.title} href={`/post/${post.slug.current}`}>
            <Card className="px-4 py-2 my-2 bg-secondary bg-opacity-20">
              <div className="pb-2 text-secondary">
                <h6>{post.title}</h6>
                <div className="text-xs">{post?.subheading}&nbsp;</div>
              </div>
              <Image
                src={urlFor(post.mainImage)
                  .width(400)
                  .height(200)
                  .fit("crop")
                  .auto("format")
                  .url()}
              />
              <div className="pt-2 text-secondary">
                {post.categories.map((category) => (
                  <span className="px-2">{category.title}</span>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
