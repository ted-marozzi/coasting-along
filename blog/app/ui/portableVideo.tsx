"use client";
import { clientConfig } from "@/sanity/client";
import { cn } from "@nextui-org/react";
import { PortableTextTypeComponentProps } from "@portabletext/react";
import { getFile } from "@sanity/asset-utils";
import { useState } from "react";

export function PortableVideo({
  value,
}: Omit<PortableTextTypeComponentProps<any>, "renderNode">) {
  const [hasPlayed, setHasPlayed] = useState(false);

  // TODO: get working on mobile, ask darling if it needs an alt underneath,

  if (!value?.asset?._ref) {
    return null;
  }

  const file = getFile(value, {
    projectId: clientConfig.projectId,
    dataset: clientConfig.dataset,
  });

  return (
    <div className="py-6 relative flex justify-center items-center">
      <video
        className={cn("rounded-xl", { "blur-sm": !hasPlayed })}
        muted
        playsInline
        onMouseEnter={(event) => {
          event.currentTarget.play();
        }}
        onClick={(event) => {
          event.currentTarget.play();
        }}
        onMouseLeave={(event) => {
          event.currentTarget.pause();
        }}
        onPlaying={() => {
          setHasPlayed(true);
        }}
      >
        <source src={file.asset.url} />
      </video>
      {!hasPlayed && (
        <div className="absolute p-4 text-3xl backdrop-blur-2xl bg-white/60 rounded-lg">
          Hover me!
        </div>
      )}
    </div>
  );
}
