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

const components: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <Image
          alt={value.alt ?? ""}
          loading="lazy"
          src={urlFor(value).width(800).height(400).fit("max").auto("format").url()}
        />
      );
    },
  },
  block: {
    h1: ({ value }) => {
      return value.children.map((title) => <h1 className="py-2">{title.text}</h1>);
    },
  },
};

export function PortableText<
  B extends TypedObject = PortableTextBlock | ArbitraryTypedObject,
>(props: { value: B | B[] }) {
  return <PortableTextInternal components={components} value={props.value} />;
}
