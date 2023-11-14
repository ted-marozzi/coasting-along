"use client";
import { Autocomplete, AutocompleteItem, Link } from "@nextui-org/react";
import { SearchIcon } from "./icons";
import { useAsyncList } from "@react-stately/data";

import { PostSearchResult, searchPosts } from "@/actions/sanity";

export function SearchInput() {
  const list = useAsyncList<PostSearchResult>({
    async load({ filterText }) {
      return {
        items: await searchPosts(filterText),
      };
    },
  });
  return (
    <Autocomplete
      className="lg:w-96"
      aria-label="Search posts"
      placeholder="Search posts..."
      size="sm"
      startContent={<SearchIcon size={18} />}
      inputValue={list.filterText}
      onInputChange={list.setFilterText}
      isLoading={list.isLoading}
      items={list.items}
      allowsCustomValue={true}
      popoverProps={{ radius: "sm" }}
      inputProps={{ suppressHydrationWarning: true }}
    >
      {(post) => (
        <AutocompleteItem key={post.title}>
          <Link href={`/post/${post.slug.current}`} color="secondary" className="w-full">
            {post.title}
          </Link>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
