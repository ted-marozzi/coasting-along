import { PropsWithChildren } from "react";

export function Content(props: PropsWithChildren) {
  return <div className="max-w-3xl px-4 mx-auto">{props.children}</div>;
}
