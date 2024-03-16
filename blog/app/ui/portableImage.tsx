import { PortableTextTypeComponentProps } from "@portabletext/react";
import { SanityImage } from "@/sanity/image";
export function PortableImage({ value }: PortableTextTypeComponentProps<any>) {
  if (!value?.asset?._ref) {
    return null;
  }
  return (
    <div className="py-6">
      <SanityImage source={value} alt={""} />
      <div className="text-center pt-1">{value.alt}</div>
    </div>
  );
}
