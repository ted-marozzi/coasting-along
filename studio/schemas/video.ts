import { defineType } from "sanity";
import { PlayIcon } from "@sanity/icons";

export const video = defineType({
  type: "file",
  name: "video",
  title: "Video",
  icon: PlayIcon,
  fields: [
    {
      name: "alt",
      type: "string",
      title: "Video caption",
      description: "Export as 720p in QuickTime first",
      validation: (Rule) => Rule.required(),
      // @ts-ignore
      codegen: { required: true },
    },
  ],
});
