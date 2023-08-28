import { PropsWithChildren } from "react";

export function Content(props: PropsWithChildren) {
  return (
    <div className="max-w-3xl m-auto" style={{ margin: "auto" }}>
      {props.children}
    </div>
  );
}
