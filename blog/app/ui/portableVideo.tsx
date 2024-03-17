"use client";
import { clientConfig } from "@/sanity/client";
import { Progress, cn } from "@nextui-org/react";
import { PortableTextTypeComponentProps } from "@portabletext/react";
import { getFile } from "@sanity/asset-utils";
import { useState } from "react";
import { isMobile } from "react-device-detect";

export function PortableVideo({
  value,
}: Omit<PortableTextTypeComponentProps<any>, "renderNode">) {
  if (!value?.asset?._ref) {
    return null;
  }

  const file = getFile(value, {
    projectId: clientConfig.projectId,
    dataset: clientConfig.dataset,
  });

  return (
    <div className="py-6 relative flex flex-col justify-center items-center">
      <video
        aria-label=""
        className={cn("rounded-xl")}
        muted
        playsInline
        autoPlay
        controls
        style={{
          maxHeight: "70vh",
          maxWidth: "min(90vw, 100%)",
          objectFit: "contain",
          overflow: "auto",
          objectPosition: "center",
        }}
      >
        <source src={file.asset.url} type="video/mp4" />
      </video>

      {value.alt && <div className="text-center pt-1">{value.alt}</div>}
    </div>
  );
}
