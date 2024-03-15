import { defineType, defineField } from "sanity";
import { PlayIcon } from "@sanity/icons";

export const video = defineType({
  type: "file",
  name: "video",
  title: "Video",
  icon: PlayIcon,
});
