"use client";
import { AvatarGroup as AvatarGroupInternal } from "@nextui-org/avatar";
import { AvatarGroupProps } from "@nextui-org/react";

export function AvatarGroup(props: AvatarGroupProps & { show: boolean }) {
  if (!props.show) {
    return <div className="py-2 px-2">{props.children}</div>;
  }
  return <AvatarGroupInternal {...props} className="py-2 px-4" size="lg" />;
}
