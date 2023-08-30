import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { Author } from "@/sanity/types";
import { LightBoxImage } from "@/ui/lightBoxImage";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Authors | Coasting Along",
  description: "The Coasting Along author team",
};

export default async function Page() {
  const authors = (await client.fetch<Array<Author>>(`*[_type == "author"]`)).reverse();

  return (
    <>
      <div className="pb-2">
        <h2>Hello 👋</h2>
        <h6>Lets meet the Authors of Coasting Along</h6>
      </div>
      {authors.map((author, i) => (
        <div key={author._id} id={author.name}>
          <div className="hidden md:flex py-14">
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
          <div className="flex flex-col md:hidden py-4">
            <AuthorText author={author} />
            <AuthorImage author={author} />
          </div>
        </div>
      ))}
    </>
  );
}

function AuthorText(props: { author: Author }) {
  return (
    <div className="flex-1 p-2">
      <h4>{props.author.name}</h4>
      <PortableText value={props.author.bio} />
    </div>
  );
}

function AuthorImage(props: { author: Author }) {
  return (
    <div className="flex-1 flex justify-center items-center p-2">
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
