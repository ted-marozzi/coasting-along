import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      // @ts-ignore
      codegen: { required: true },
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      description:
        "Concise summary of page content for search results (won't be displayed directly on the page)",
      type: "string",
      validation: (Rule) => Rule.required(),
      // @ts-ignore
      codegen: { required: true },
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      // @ts-ignore
      codegen: { required: true },
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "array",
      of: [{ type: "reference", to: { type: "author" } }],
      validation: (Rule) => Rule.required(),
      // @ts-ignore
      codegen: { required: true },
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Main image caption",
          validation: (Rule) => Rule.required(),
          // @ts-ignore
          codegen: { required: true },
        },
      ],
      validation: (Rule) => Rule.required(),
      // @ts-ignore
      codegen: { required: true },
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: (Rule) => Rule.required(),
      // @ts-ignore
      codegen: { required: true },
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      options: {
        spellCheck: true,
      },
      validation: (Rule) => Rule.required(),
      // @ts-ignore
      codegen: { required: true },
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
