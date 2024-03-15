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
import { PortableVideo } from "@/ui/portableVideo";

const components: Partial<PortableTextReactComponents> = {
  types: {
    image: PortableImage,
    video: ({ value, index, isInline }) => (
      <PortableVideo value={value} index={index} isInline={isInline} />
    ),
  },
  block: {
    h1: ({ value }) => {
      return value.children.map((title) => (
        <h1 key={title.text} className="py-4">
          {title.text}
        </h1>
      ));
    },
    h2: ({ value }) => {
      return value.children.map((title) => (
        <h2 key={title.text} className="py-4">
          {title.text}
        </h2>
      ));
    },
    h3: ({ value }) => {
      return value.children.map((title) => (
        <h3 key={title.text} className="py-4">
          {title.text}
        </h3>
      ));
    },
    h4: ({ value }) => {
      return value.children.map((title) => (
        <h4 key={title.text} className="py-4">
          {title.text}
        </h4>
      ));
    },
    h5: ({ value }) => {
      return value.children.map((title) => (
        <h5 key={title.text} className="py-4">
          {title.text}
        </h5>
      ));
    },
    h6: ({ value }) => {
      return value.children.map((title) => (
        <h6 key={title.text} className="py-4">
          {title.text}
        </h6>
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
