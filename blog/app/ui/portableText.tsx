import { urlFor } from "@/sanity/image";
import {
  PortableText as PortableTextInternal,
  PortableTextReactComponents,
} from "@portabletext/react";
import {
  ArbitraryTypedObject,
  PortableTextBlock,
  TypedObject,
} from "@portabletext/types";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";

const components: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
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
    },
  },
  block: {
    h1: ({ value }) => {
      return value.children.map((title) => (
        <h1 key={title.text} className="py-2">
          {title.text}
        </h1>
      ));
    },
  },
  marks: {
    link: ({ value, children }) => {
      return (
        <Link href={value.href} isExternal className="text-blue-600">
          {children}
        </Link>
      );
    },
  },
};

export function PortableText<
  B extends TypedObject = PortableTextBlock | ArbitraryTypedObject,
>(props: { value: B | B[] }) {
  return <PortableTextInternal components={components} value={props.value} />;
}
