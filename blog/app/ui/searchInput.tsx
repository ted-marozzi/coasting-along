"use client";
import {
  Button,
  Input,
  Kbd,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { CloseButton, SearchIcon } from "./icons";
import { useAsyncList } from "@react-stately/data";
import type { PostSearchResult } from "@/api/search/route";
import { useEffect, useRef } from "react";

export function SearchInput() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const ref = useRef<HTMLInputElement | null>(null);
  const list = useAsyncList<PostSearchResult>({
    async load({ filterText }) {
      try {
        const response = await fetch(
          `${window.location.origin}/api/search?query=${filterText}`,
        );
        const json = await response.json();
        return {
          items: json.results,
        };
      } catch (error) {
        console.error("[search]", error);
        return { items: [] };
      }
    },
  });

  useEffect(() => {
    if (isOpen) {
      ref.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "k") {
        onOpen();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onOpen]);

  const hasItems = list.items.length > 0;

  return (
    <>
      <Button
        className="px-6 w-full"
        startContent={<SearchIcon size={18} />}
        endContent={
          <Kbd keys={["command"]} className="mx-2 text-secondary hidden lg:block">
            K
          </Kbd>
        }
        onPress={onOpen}
        variant="flat"
        color="secondary"
        size="lg"
      >
        Search Posts...
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton={true}
        radius="lg"
        size="xl"
        placement="top"
        scrollBehavior="inside"
        backdrop="blur"
      >
        <ModalContent>
          <>
            <Input
              ref={ref}
              type="text"
              classNames={{ inputWrapper: "rounded-b-none" }}
              placeholder="Search posts..."
              startContent={
                <span className="mx-2">
                  <SearchIcon size={18} />
                </span>
              }
              endContent={
                <>
                  {list.filterText.length > 0 && (
                    <Button
                      isIconOnly={true}
                      radius="full"
                      size="sm"
                      className="mx-2 text-secondary"
                      onClick={() => {
                        list.setFilterText("");
                      }}
                    >
                      {list.isLoading ? (
                        <Spinner size="sm" color="secondary" />
                      ) : (
                        <CloseButton size={20} />
                      )}
                    </Button>
                  )}
                  <Kbd className="mx-2">ESC</Kbd>
                </>
              }
              size="lg"
              value={list.filterText}
              onValueChange={list.setFilterText}
            />
            <ModalBody className="max-h-96 px-2">
              <Listbox aria-label={"Search posts"}>
                {hasItems ? (
                  list.items.map((post) => (
                    <ListboxItem
                      key={post.slug.current}
                      color="secondary"
                      href={`/post/${post.slug.current}`}
                      className="w-full h-16 text-secondary"
                      variant="flat"
                      textValue={post.title}
                    >
                      <h6>{post.title}</h6>
                    </ListboxItem>
                  ))
                ) : (
                  <ListboxItem
                    key="no-results"
                    color="secondary"
                    className="w-full h-16 text-secondary"
                    variant="flat"
                    textValue={"No result"}
                    onClick={() => {
                      list.setFilterText("");
                    }}
                  >
                    <h6>No Results</h6>
                  </ListboxItem>
                )}
              </Listbox>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
