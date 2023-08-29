import { urlFor } from "@/sanity/image";
import { Image } from "@nextui-org/image";

export function PortableImage({ value }: any) {
  if (!value?.asset?._ref) {
    return null;
  }
  return (
    <Image
      className="p-2"
      alt={value.alt}
      loading="lazy"
      src={urlFor(value).width(1024).height(400).fit("max").auto("format").url()}
    />
  );
}
