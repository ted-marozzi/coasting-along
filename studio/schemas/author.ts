import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      // @ts-ignore
      codegen: { required: true },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      // @ts-ignore
      codegen: { required: true },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
      validation: (Rule) => Rule.required(),
      // @ts-ignore
      codegen: { required: true },
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
