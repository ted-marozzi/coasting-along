import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { Author } from "@/sanity/types";
import { LightBoxImage } from "@/ui/lightBoxImage";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next/types";

type RouteParams = { params: { name: string } };

export const metadata: Metadata = {
  title: "Authors | Coasting Along",
  description: "The Coasting Along author team",
};

export default async function Page({ params }: RouteParams) {
  const authors = (await client.fetch<Array<Author>>(`*[_type == "author"]`)).reverse();
  return (
    <>
      <div className="pb-2">
        <h2>Our Writers</h2>
      </div>
      {authors.map((author, i) => (
        <div id={author.name} className="flex py-14">
          {i % 2 === 0 ? (
            <>
              <AuthorImage author={author} /> <AuthorText author={author} />
            </>
          ) : (
            <>
              <AuthorText author={author} /> <AuthorImage author={author} />
            </>
          )}
        </div>
      ))}
    </>
  );
}

function AuthorText(props: { author: Author }) {
  return (
    <div className="flex-1">
      <h4>{props.author.name}</h4>
      <PortableText value={props.author.bio} />
    </div>
  );
}

function AuthorImage(props: { author: Author }) {
  return (
    <div className="flex-1 flex justify-center items-center">
      <LightBoxImage
        src={urlFor(props.author.image).width(400).height(400).url()}
        lightBoxSrc={urlFor(props.author.image)
          .width(800)
          .height(800)
          .auto("format")
          .url()}
        alt={`${props.author.name}'s Profile`}
      />
    </div>
  );
}
