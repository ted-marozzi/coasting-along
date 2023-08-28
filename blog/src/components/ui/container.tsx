import { PropsWithChildren } from "react";

export function Container(props: PropsWithChildren) {
  return <div className="container mx-auto">{props.children}</div>;
}
