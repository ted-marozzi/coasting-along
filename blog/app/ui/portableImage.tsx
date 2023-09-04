import { urlFor } from "@/sanity/image";
import { LightBoxImage } from "./lightBoxImage";

export function PortableImage({ value }: any) {
  if (!value?.asset?._ref) {
    return null;
  }
  return (
    <div className="py-6">
      <LightBoxImage
        alt={""}
        src={urlFor(value).width(1024).maxHeight(800).auto("format").url()}
        lightBoxSrc={urlFor(value)
          .maxWidth(1024)
          .height(800)
          .fit("crop")
          .auto("format")
          .url()}
        loading="lazy"
      />
      <div className="text-center">{value.alt}</div>
    </div>
  );
}
