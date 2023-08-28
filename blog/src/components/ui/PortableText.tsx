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

const components: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt ?? ""}
          loading="lazy"
          src={urlFor(value).width(800).height(400).fit("max").auto("format").url()}
        />
      );
    },
  },
};

export function PortableText<
  B extends TypedObject = PortableTextBlock | ArbitraryTypedObject,
>(props: { value: B | B[] }) {
  return <PortableTextInternal components={components} value={props.value} />;
}
