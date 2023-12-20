"use client";
import { requestMessagingPermission } from "@/firebase";
import { Button } from "@nextui-org/button";
import { useState } from "react";

const logging = "[PushNotificationsButton]";

export function PushNotificationsButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);

  if (enabled) {
    return <></>;
  }

  return (
    <Button
      variant="flat"
      color="secondary"
      onClick={async () => {
        setIsLoading(true);
        try {
          const enabled = await requestMessagingPermission();
          setEnabled(enabled);
        } catch (err) {
          console.error(logging, err);
          try {
            const enabled = await requestMessagingPermission();
            setEnabled(enabled);
          } catch (err) {
            console.error(logging, "second try", err);
          }
        }

        setIsLoading(false);
      }}
      isLoading={isLoading}
      className="p-4"
    >
      Enable notifications
    </Button>
  );
}
