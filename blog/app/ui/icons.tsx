import { Image } from "@nextui-org/image";

export function Icon(props: { className?: string }) {
  return (
    <Image
      alt="Coasting Along Icon"
      src="/image-icon.png"
      width={64}
      height={64}
      className={props.className}
    />
  );
}

export function TitleIcon(props: { className?: string }) {
  return (
    <Image
      alt="Coasting Along Title Icon"
      src="/title-icon.png"
      width={64}
      height={64}
      className={props.className}
    />
  );
}
