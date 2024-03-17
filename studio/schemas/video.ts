import { defineType } from "sanity";
import { PlayIcon } from "@sanity/icons";

export const video = defineType({
  type: "file",
  name: "video",
  title: "Video",
  description: "Export as 720p in QuickTime first",
  icon: PlayIcon,
  fields: [
    {
      name: "alt",
      type: "string",
      title: "Video caption",
      validation: (Rule) => Rule.required(),
      // @ts-ignore
      codegen: { required: true },
    },
  ],
});
