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

export function SearchIcon({
  size = 24,
  strokeWidth = 1.5,
}: {
  size?: number | string;
  strokeWidth?: number;
}): JSX.Element {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size}
      width={size}
      role="presentation"
      viewBox="0 0 24 24"
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

export function CloseButton({
  size = 24,
  strokeWidth = 1.5,
}: {
  size?: number | string;
  strokeWidth?: number;
}) {
  return (
    <svg
      height={size}
      width={size}
      aria-hidden="true"
      fill="none"
      focusable="false"
      role="presentation"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
    >
      <path d="M18 6L6 18M6 6l12 12"></path>
    </svg>
  );
}
