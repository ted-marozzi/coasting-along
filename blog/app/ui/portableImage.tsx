import { urlFor } from "@/sanity/image";
import { Image } from "@nextui-org/image";
import { Card } from "@nextui-org/card";

export function PortableImage({ value }: any) {
  if (!value?.asset?._ref) {
    return null;
  }
  return (
    <div className="m-3">
      <Image
        alt={""}
        src={urlFor(value).width(1024).maxHeight(1024).fit("crop").auto("format").url()}
      />
      <div className="text-center">{value.alt}</div>
    </div>
  );
}
