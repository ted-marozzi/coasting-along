import {
  PortableText as PortableTextInternal,
  PortableTextReactComponents,
} from "@portabletext/react";
import {
  ArbitraryTypedObject,
  PortableTextBlock,
  TypedObject,
} from "@portabletext/types";
import { Link } from "@nextui-org/link";
import { PortableImage } from "./portableImage";

const components: Partial<PortableTextReactComponents> = {
  types: {
    image: PortableImage,
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
        <Link href={value.href} isExternal color="secondary">
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
