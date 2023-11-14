"use client";
import { Autocomplete, AutocompleteItem, Link } from "@nextui-org/react";
import { SearchIcon } from "./icons";
import { useAsyncList } from "@react-stately/data";
import type { PostSearchResult } from "@/api/search/route";

export function SearchInput() {
  const list = useAsyncList<PostSearchResult>({
    async load({ filterText }) {
      try {
        const response = await fetch(
          `${window.location.origin}/api/search?query=${filterText}`,
        );
        const json = await response.json();
        console.info("[search]", response, json);
        return {
          items: json.results,
        };
      } catch (error) {
        console.error("[search]", error);
        return { items: [] };
      }
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
