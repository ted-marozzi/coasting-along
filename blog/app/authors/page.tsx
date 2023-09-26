import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { Author } from "@/sanity/types";
import { LightBoxImage } from "@/ui/lightBoxImage";
import { Avatar } from "@/ui/avatar";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Authors | Coasting Along",
  description: "The Coasting Along author team",
};

export default async function Page() {
  const mainAuthor = (
    await client.fetch<Array<Author>>(`*[_type == "author" && name == "Ruby and Ted"]`)
  )[0];

  const guestAuthors = await client.fetch<Array<Author>>(
    `*[_type == "author" && name != "Ruby and Ted" && name != "Ruby" && name != "Ted"]`,
  );

  return (
    <>
      <h2 className="py-2">Creators of Coasting Along</h2>
      <div id="Ruby">
        <div id="Ted">
          <div id="Ruby and Ted">
            <MainAuthorImage author={mainAuthor} width={1000} height={600} />{" "}
            <MainAuthorText author={mainAuthor} />
          </div>
        </div>
      </div>
      {guestAuthors.length > 0 && (
        <>
          <h2 className="py-2">Guests</h2>
          <div className="flex flex-wrap">
            {guestAuthors.map((author) => (
              <div key={author._id} id={author.name} className="py-2 text-center">
                <GuestAuthorImage author={author} />
                <h4 className="py-2">{author.name}</h4>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

function MainAuthorText(props: { author: Author }) {
  return (
    <div className="flex-1 py-2">
      <h4 className="py-2">{props.author.name}</h4>
      {props.author.bio && <PortableText value={props.author.bio} />}
    </div>
  );
}

function MainAuthorImage(props: { author: Author; width: number; height: number }) {
  return (
    <div className="flex-1 flex justify-center items-center py-2">
      <LightBoxImage
        src={urlFor(props.author.image).width(props.width).height(props.height).url()}
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

function GuestAuthorImage(props: { author: Author }) {
  return (
    <LightBoxImage
      className="rounded-full w-48 h-48"
      src={urlFor(props.author.image).width(400).height(400).url()}
      lightBoxSrc={urlFor(props.author.image).width(800).height(800).auto("format").url()}
      alt={`${props.author.name}'s Profile`}
    />
  );
}
