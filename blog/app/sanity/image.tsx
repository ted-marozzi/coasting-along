"use client";

import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Image } from "@nextui-org/react";
import { urlFor } from "./util";

export function SanityImage(props: {
  height?: number;
  width?: number;
  source: SanityImageSource;
  alt: string;
  loading?: "eager" | "lazy";
}) {
  let imageUrl = urlFor(props.source).auto("format");

  if (props.height !== undefined) {
    imageUrl = imageUrl.height(props.height);
  }
  if (props.width !== undefined) {
    imageUrl = imageUrl.width(props.width);
  }

  return (
    <div className="flex justify-center items-center">
      <Image
        loading={props.loading}
        src={imageUrl.url()}
        alt={props.alt}
        height={props.height}
        width={props.width}
        style={{
          maxHeight: "70vh",
          maxWidth: "min(90vw, 100%)",
          objectFit: "contain",
          overflow: "auto",
          objectPosition: "center",
        }}
      />
    </div>
  );
}
