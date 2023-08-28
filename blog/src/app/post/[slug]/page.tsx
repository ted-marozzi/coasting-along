import { client } from "@/sanity/client";
import type { Author, Category, Post } from "@/../../studio/schemas/types";
import { AvatarGroup } from "@/components/ui/avatar";
import { urlFor } from "@/sanity/image";
import { Avatar } from "@nextui-org/avatar";
import { PortableText } from "@/components/ui/portableText";
import { Row } from "@/components/ui/layout";
import { Tooltip } from "@nextui-org/tooltip";
import { Container } from "@/components/ui/container";

type PostDeref = Omit<Post, "authors" | "categories"> & {
  authors: Array<Author>;
  categories: Array<Category>;
};
export default async function Page({ params }: { params: { slug: string } }) {
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
      <div className="max-w-screen-lg mx-auto">
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
        <PortableText value={post.body} />
      </div>
    </Container>
  );
}
