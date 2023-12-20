import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Coasting Along",
    short_name: "Coasting Along",
    description:
      "Join Ruby and Ted on Coasting Along as they explore Australia from coast to coaster. Discover travel adventures, remote work tips, surfing spots, and mouth-watering food experiences.",
    background_color: "#f6efdc",
    display: "fullscreen",
    start_url: "/",
    scope: "/",
    icons: [
      {
        src: "/image-icon-background.png",
        sizes: "500x500",
        type: "image/png",
      },
    ],
  };
}
