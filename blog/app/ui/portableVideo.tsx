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
  const [blurred, setBlurred] = useState(true);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [showUserPrompt, setShowUserPrompt] = useState(true);

  if (!value?.asset?._ref) {
    return null;
  }

  // TODO: test on mobile
  // TODO: Skeleton

  const file = getFile(value, {
    projectId: clientConfig.projectId,
    dataset: clientConfig.dataset,
  });

  return (
    <div className="py-6 relative flex flex-col justify-center items-center">
      <Skeleton
        className="rounded-xl w-full flex flex-col justify-center items-center"
        isLoaded={!initialLoad}
      >
        <video
          aria-label=""
          className={cn("rounded-xl", { "blur-sm": blurred })}
          muted
          playsInline
          style={{
            maxHeight: "70vh",
            maxWidth: "min(90vw, 100%)",
            objectFit: "contain",
            overflow: "auto",
            objectPosition: "center",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.play();
            setShowUserPrompt(false);
          }}
          onClick={(event) => {
            event.currentTarget.play();
            setShowUserPrompt(false);
          }}
          onMouseLeave={(event) => {
            event.currentTarget.pause();
          }}
          onCanPlay={() => {
            setInitialLoad(false);
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
      </Skeleton>
      {showUserPrompt && !initialLoad && !loading && (
        <div className="flex justify-center items-center w-full h-full absolute pointer-events-none">
          <span className="text-xl rounded-lg backdrop-blur-3xl p-4">
            {isMobile ? "Tap" : "Hover"} me!
          </span>
        </div>
      )}
      {loading && <Progress isIndeterminate={true} className="py-2" size="sm" />}
      {value.alt && <div className="text-center pt-1">{value.alt}</div>}
    </div>
  );
}
