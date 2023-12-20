import { client } from "@/sanity/client";
import { Card } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import type { PostDeref } from "@/post/[slug]/page";
import { SanityImage } from "@/sanity/image";
import { Metadata } from "next";
import { pwaMetadata } from "@/metaData";

const route = "[/]";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Coasting Along",
  description:
    "Join Ruby and Ted on Coasting Along as they explore Australia from coast to coaster. Discover travel adventures, remote work tips, surfing spots, and mouth-watering food experiences.",
  ...pwaMetadata,
};

export default async function Home() {
  const posts = await client.fetch<
    Array<Pick<PostDeref, "mainImage" | "title" | "slug" | "categories" | "subheading">>
  >(
    `*[_type == "post"] | order(_createdAt desc) {
      slug,
      title,
      mainImage,
      subheading,
      categories[]->
    }`,
  );

  console.debug(route, "rendering");

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 place-content-center place-items-center">
        {posts.map((post) => (
          <Link key={post.title} href={`/post/${post.slug.current}`}>
            <Card className="p-4 bg-secondary bg-opacity-20 flex flex-col justify-between items-between w-80">
              <div className="pb-2 text-secondary">
                <h6 className="h-14">{post.title}</h6>
                <div className="text-xs h-8">{post?.subheading}&nbsp;</div>
              </div>
              <SanityImage
                source={post.mainImage}
                width={400}
                height={200}
                alt={post.mainImage.alt}
                loading="eager"
              />
              <div className="pt-2 text-secondary flex justify-center">
                {post.categories.map((category) => (
                  <span key={category._id} className="px-2">
                    {category.title}
                  </span>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
