"use client";
import { Image } from "@nextui-org/image";
import { Modal } from "@nextui-org/modal";
import { ModalContent } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/use-disclosure";

export function LightBoxImage(props: { src: string; alt: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        className="bg-background"
        scrollBehavior="outside"
      >
        <ModalContent className="p-8 !m-auto">
          <Image alt={props.alt} src={props.src} />
        </ModalContent>
      </Modal>
      <Image
        alt={props.alt}
        src={props.src}
        onClick={onOpen}
        className="cursor-zoom-in"
      />
    </>
  );
}
