import { client } from "@/sanity/client";
import type { Author, Category, Post } from "@/sanity/types";
import { AvatarGroup } from "@/ui/avatar";
import { urlFor } from "@/sanity/image";
import { Avatar } from "@nextui-org/avatar";
import { PortableText } from "@/ui/portableText";
import { Row } from "@/ui/uiLayout";
import { Tooltip } from "@nextui-org/tooltip";
import { Container } from "@/ui/container";
import { Content } from "@/ui/content";
import { Metadata } from "next/types";

type PostDeref = Omit<Post, "authors" | "categories"> & {
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

  return (
    <Container>
      <Content>
        <h1 className="py-3">{post.title}</h1>
        <Row mainAxisAlignment="start" crossAxisAlignment="end">
          by
          <AvatarGroup show={post.authors.length >= 2}>
            {post.authors.map((author) => (
              <Tooltip content={author.name} key={author._id}>
                <Avatar
                  isBordered
                  color="primary"
                  src={urlFor(author.image.asset).width(256).width(256).url()}
                  alt={author.name}
                />
              </Tooltip>
            ))}
          </AvatarGroup>
        </Row>
        <div className="py-4">
          <PortableText value={post.body} />
        </div>
      </Content>
    </Container>
  );
}
