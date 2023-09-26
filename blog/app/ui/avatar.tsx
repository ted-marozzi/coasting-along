"use client";
import {
  AvatarGroup as AvatarGroupInternal,
  Avatar as AvatarInternal,
} from "@nextui-org/avatar";
import { AvatarGroupProps } from "@nextui-org/react";

export function AvatarGroup(props: AvatarGroupProps & { show: boolean }) {
  if (!props.show) {
    return <div>{props.children}</div>;
  }

  return <AvatarGroupInternal {...{ ...props, show: undefined }} size="lg" />;
}

export const Avatar = AvatarInternal;
