"use client";
import { Image } from "@nextui-org/image";
import { Modal } from "@nextui-org/modal";
import { ModalContent } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/use-disclosure";
// TODO all urls are auto and pass in explicit width and height
export function LightBoxImage(props: {
  src: string;
  lightBoxSrc: string;
  alt: string;
  loading?: "eager" | "lazy";
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        className="bg-background"
      >
        <ModalContent className="p-8 !m-auto flex items-center">
          <Image alt={props.alt} src={props.lightBoxSrc} loading={props.loading} />
        </ModalContent>
      </Modal>
      <Image
        alt={props.alt}
        src={props.src}
        onClick={onOpen}
        loading={props.loading}
        className="cursor-zoom-in"
      />
    </>
  );
}
