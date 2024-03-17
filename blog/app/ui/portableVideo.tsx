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
  const [loading, setLoading] = useState(true);
  const [hasBeenPlayed, setHasBeenPlayed] = useState(false);

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
        onMouseEnter={(event) => {
          event.currentTarget.play();
        }}
        onClick={(event) => {
          event.currentTarget.play();
        }}
        onPlay={() => {
          setLoading(false);
          setHasBeenPlayed(true);
        }}
        onPlaying={() => {
          setLoading(false);
          setHasBeenPlayed(true);
        }}
        onCanPlay={(event) => {
          // Stop autoplay, we set the attribute only to make the video download on ios mobile
          if (!hasBeenPlayed) {
            event.currentTarget.pause();
          }
          setLoading(false);
        }}
        onWaiting={() => {
          setLoading(true);
        }}
      >
        <source src={file.asset.url} type="video/mp4" />
      </video>
      {!loading && !hasBeenPlayed && (
        <div className="flex justify-center items-center w-full h-full absolute pointer-events-none">
          <span className="text-xl rounded-lg backdrop-blur-3xl p-4">
            {isMobile ? "Tap" : "Hover"} me!
          </span>
        </div>
      )}
      {loading && <Progress isIndeterminate={true} className="py-2 w-40" size="sm" />}
      {value.alt && <div className="text-center pt-1">{value.alt}</div>}
    </div>
  );
}
