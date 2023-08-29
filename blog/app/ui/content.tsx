import { PropsWithChildren } from "react";

export function Content(props: PropsWithChildren) {
  return <div className="max-w-5xl px-4 pt-8 mx-auto">{props.children}</div>;
}
