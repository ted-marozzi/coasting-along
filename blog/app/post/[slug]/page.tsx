import { CategoryChips } from "@/components/categories";
import { client } from "@/sanity/client";
import type { Author, Category, Post } from "@/sanity/types";
import { AvatarGroup } from "@/ui/avatar";
import { SanityImage } from "@/sanity/image";
import { PortableText } from "@/ui/portableText";
import { Column, Row } from "@/ui/uiLayout";
import { Avatar } from "@nextui-org/avatar";
import { Link } from "@nextui-org/link";
import { Tooltip } from "@nextui-org/tooltip";
import { Metadata } from "next/types";
import { urlFor } from "@/sanity/util";
import { LastUpdated } from "@/components/lastUpdated";
import { notFound } from "next/navigation";

export type PostDeref = Omit<Post, "authors" | "categories"> & {
  authors: Array<Author>;
  categories: Array<Category>;
};

export const runtime = "edge";

type RouteParams = { params: { slug: string } };

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const post = await client.fetch<{ title: string; metaDescription: string }>(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      metaDescription
    }`,
    { slug: params.slug },
  );

  if (post === null) {
    return {};
  }

  return {
    title: `${post.title} | Coasting Along`,
    description: post.metaDescription,
  };
}

export default async function Page({ params }: RouteParams) {
  const route = `[post/${params.slug}]`;
  const post = await client.fetch<PostDeref>(
    `*[_type == "post" && slug.current == $slug][0]{
    ...,
    authors[]->,
    categories[]->,
  }`,
    { slug: params.slug },
  );

  if (post === null) {
    console.debug(route, `page not found`);
    notFound();
  }
  console.debug(route, `rendering`);

  const lastUpdated = new Date(post._updatedAt);
  const multipleAuthors = post.authors.length >= 2;

  return (
    <>
      <div className="pb-4">
        <h1>{post.title}</h1>
        {post.subheading !== undefined && post.subheading !== "" && (
          <h6>{post.subheading}</h6>
        )}
      </div>
      <div className="pb-4">
        <SanityImage
          loading="eager"
          source={post.mainImage}
          width={1024}
          height={500}
          alt={post.mainImage.alt}
        />
      </div>
      <Row mainAxisAlignment="start" crossAxisAlignment="stretch" className="pb-4">
        <div className="px-4">
          <AvatarGroup show={multipleAuthors} size="lg">
            {post.authors.map((author) => (
              <Tooltip
                content={author.name}
                key={author._id}
                placement={multipleAuthors ? "bottom-end" : "bottom"}
                classNames={{
                  base: "text-secondary",
                  content: "bg-secondary bg-opacity-20 ",
                }}
              >
                <Link
                  href={`/authors#${author.name}`}
                  className="hover:z-10 hover:opacity-100"
                >
                  <Avatar
                    isBordered
                    color="secondary"
                    size="lg"
                    src={urlFor(author.image.asset)
                      .width(256)
                      .width(256)
                      .auto("format")
                      .url()}
                    alt={author.name}
                  />
                </Link>
              </Tooltip>
            ))}
          </AvatarGroup>
        </div>
        <Column mainAxisAlignment="space-between">
          <CategoryChips categories={post.categories} variant="flat" />
          <LastUpdated date={lastUpdated} />
        </Column>
      </Row>
      <div className="py-4">
        <PortableText value={post.body} />
      </div>
    </>
  );
}
