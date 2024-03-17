"use client";
import { clientConfig } from "@/sanity/client";
import { Progress, Skeleton, cn } from "@nextui-org/react";
import { PortableTextTypeComponentProps } from "@portabletext/react";
import { getFile } from "@sanity/asset-utils";
import { useState } from "react";
import { isMobile } from "react-device-detect";

export function PortableVideo({
  value,
}: Omit<PortableTextTypeComponentProps<any>, "renderNode">) {
  const [loading, setLoading] = useState(true);

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
        style={{
          maxHeight: "70vh",
          maxWidth: "min(90vw, 100%)",
          objectFit: "contain",
          overflow: "auto",
          objectPosition: "center",
        }}
        onClick={(event) => {
          if (event.currentTarget.paused) {
            event.currentTarget.play();
          } else {
            event.currentTarget.pause();
          }
        }}
        onCanPlay={() => {
          setLoading(false);
        }}
        onWaiting={() => {
          setLoading(true);
        }}
      >
        <source src={file.asset.url} type="video/mp4" />
      </video>
      {loading && <Progress isIndeterminate={true} className="py-2" size="sm" />}
      {value.alt && <div className="text-center pt-1">{value.alt}</div>}
    </div>
  );
}
