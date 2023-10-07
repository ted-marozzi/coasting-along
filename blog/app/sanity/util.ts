import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";
import imageUrlBuilder from "@sanity/image-url";

export function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(client).image(source);
}
