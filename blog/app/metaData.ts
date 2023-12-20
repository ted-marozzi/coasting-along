import { Metadata } from "next";

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://www.coastingalong.blog";

// For some reason this doesn't work if placed in this root layout metadata
// so we import it into the page metadata's
// Maybe because we have the local icon at the root level overriding it
export const pwaMetadata: Metadata = {
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  icons: {
    shortcut: `${baseUrl}/image-icon.png`,
    apple: `${baseUrl}/image-icon-background.png`,
    icon: `${baseUrl}/image-icon.png`,
  },
};
