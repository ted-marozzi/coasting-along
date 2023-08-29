import { urlFor } from "@/sanity/image";
import { LightBoxImage } from "./lightBoxImage";

export function PortableImage({ value }: any) {
  if (!value?.asset?._ref) {
    return null;
  }
  return (
    <div className="my-3">
      <LightBoxImage
        alt={""}
        src={urlFor(value).width(1024).maxHeight(800).fit("crop").auto("format").url()}
        lightBoxSrc={urlFor(value).fit("crop").auto("format").url()}
        loading="lazy"
      />
      <div className="text-center">{value.alt}</div>
    </div>
  );
}
