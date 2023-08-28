import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(client).image(source);
}
