import { CategoryChips } from "@/components/categories";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import type { Author, Category, Post } from "@/sanity/types";
import { AvatarGroup } from "@/ui/avatar";
import { LightBoxImage } from "@/ui/lightBoxImage";
import { PortableText } from "@/ui/portableText";
import { Row } from "@/ui/uiLayout";
import { Avatar } from "@nextui-org/avatar";
import { Link } from "@nextui-org/link";
import { Tooltip } from "@nextui-org/tooltip";
import { Metadata } from "next/types";

export type PostDeref = Omit<Post, "authors" | "categories"> & {
  authors: Array<Author>;
  categories: Array<Category>;
};

type RouteParams = { params: { slug: string } };

export async function generateStaticParams({ params }: RouteParams) {
  const posts = await client.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "post"]{
      slug
    }`,
  );

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const post = await client.fetch<{ title: string; metaDescription: string }>(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      metaDescription
    }`,
    { slug: params.slug },
  );

  return {
    title: `${post.title} | Coasting Along`,
    description: post.metaDescription,
  };
}

export default async function Page({ params }: RouteParams) {
  const post = await client.fetch<PostDeref>(
    `*[_type == "post" && slug.current == $slug][0]{
    ...,
    authors[]->,
    categories[]->,
  }`,
    { slug: params.slug },
  );
  const localDate = new Date(post._updatedAt);
  const multipleAuthors = post.authors.length >= 2;
  return (
    <>
      <div className="pb-2">
        <h1>{post.title}</h1>
        {post.subheading !== undefined && post.subheading !== "" && (
          <h6>{post.subheading}</h6>
        )}
      </div>
      <div className="pb-2">
        <LightBoxImage
          loading="eager"
          src={urlFor(post.mainImage).width(1024).height(400).auto("format").url()}
          lightBoxSrc={urlFor(post.mainImage).auto("format").url()}
          alt={post.mainImage.alt}
        />
      </div>
      <div className="pb-2">
        <CategoryChips categories={post.categories} variant="flat" />
      </div>
      <div className="pb-2">{localDate.toDateString()}</div>
      <Row
        mainAxisAlignment="start"
        crossAxisAlignment="end"
        className={`pb-6 ${multipleAuthors && "px-4"}`}
      >
        <AvatarGroup show={post.authors.length >= 2}>
          {post.authors.map((author) => (
            <Tooltip
              content={author.name}
              key={author._id}
              placement="bottom"
              classNames={{
                base: "bg-secondary bg-opacity-20 text-secondary",
              }}
            >
              <Link href={`/writers#${author.name}`}>
                <Avatar
                  isBordered
                  color="secondary"
                  src={urlFor(author.image.asset).width(256).width(256).url()}
                  alt={author.name}
                />
              </Link>
            </Tooltip>
          ))}
        </AvatarGroup>
      </Row>
      <div className="py-4">
        <PortableText value={post.body} />
      </div>
    </>
  );
}
