"use client";
import { Link } from "@nextui-org/react";
import { PushNotificationsButton } from "./pushNotificationsButton";
import { Row } from "@/ui/uiLayout";

export function Footer() {
  return (
    <footer className="flex flex-col items-center py-6">
      <hr className="border-primary w-full" />
      <div className="ml-embedded" data-form="1DOqU4" />
      <PushNotificationsButton />
      <Link href="/privacy" color="secondary" underline="hover" className="m-3">
        Privacy Policy
      </Link>
    </footer>
  );
}
