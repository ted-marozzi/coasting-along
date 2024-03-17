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
      description: "Compress video here: https://www.freeconvert.com/video-compressor",
      validation: (Rule) => Rule.required(),
      // @ts-ignore
      codegen: { required: true },
    },
  ],
});
