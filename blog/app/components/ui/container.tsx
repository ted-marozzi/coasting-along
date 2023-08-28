import { PropsWithChildren } from "react";

export function Container(props: PropsWithChildren) {
  return (
    <div className="container" style={{ margin: "auto" }}>
      {props.children}
    </div>
  );
}
