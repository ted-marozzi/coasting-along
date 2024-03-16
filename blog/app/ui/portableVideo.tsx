"use client";
import { clientConfig } from "@/sanity/client";
import { Progress, cn } from "@nextui-org/react";
import { PortableTextTypeComponentProps } from "@portabletext/react";
import { getFile } from "@sanity/asset-utils";
import { useState } from "react";

export function PortableVideo({
  value,
}: Omit<PortableTextTypeComponentProps<any>, "renderNode">) {
  const [blurred, setBlurred] = useState(true);
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
        className={cn("rounded-xl", { "blur-sm": blurred })}
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
        onCanPlay={() => {
          setLoading(false);
        }}
        onWaiting={() => {
          setLoading(true);
        }}
        onPlaying={() => {
          setBlurred(false);
        }}
      >
        <source src={file.asset.url} />
      </video>
      {loading && <Progress isIndeterminate={true} className="py-2" size="sm" />}
      {value.alt && <div className="text-center pt-1">{value.alt}</div>}
    </div>
  );
}
