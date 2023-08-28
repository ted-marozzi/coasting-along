import { PropsWithChildren } from "react";

export function Row(
  props: PropsWithChildren<{
    mainAxisAlignment?:
      | "start"
      | "center"
      | "end"
      | "space-around"
      | "space-between"
      | "space-evenly"
      | "stretch";
    crossAxisAlignment?: "start" | "center" | "end";
    className?: string;
  }>,
) {
  return (
    <div
      className={props.className}
      style={{
        display: "flex",
        justifyContent: props.mainAxisAlignment,
        alignItems: props.crossAxisAlignment,
      }}
    >
      {props.children}
    </div>
  );
}
