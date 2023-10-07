"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function FloatingEmailSubscriptionForm() {
  const router = useRouter();
  const key = "email-subscription-dismissed-last";

  const [hideForm, setHideForm] = useState(true);

  useEffect(() => {
    let lastDismissed = null;

    if (typeof window !== "undefined") {
      lastDismissed = window?.localStorage?.getItem(key) ?? null;
    }

    setHideForm(
      lastDismissed !== null &&
        new Date().getMilliseconds() - Date.parse(lastDismissed) <
          32 * 24 * 60 * 60 * 1000,
    );
  }, []);

  return (
    <div
      style={{
        display: hideForm ? "none" : "",
      }}
      className="fixed bottom-0 right-0 p-4 z-10 flex flex-col items-end"
    >
      <button
        className="translate-y-5 -translate-x-2 z-20 hover:underline"
        onClick={() => {
          localStorage?.setItem(key, new Date().toString());
          router.refresh();
        }}
      >
        <svg
          className="w-3 h-3 fill-secondary"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 460.775 460.775"
          xmlSpace="preserve"
        >
          <path
            d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
	c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
	c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
	c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
	l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
	c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
          />
        </svg>
      </button>
      <div
        className="ml-embedded shadow-2xl !bg-secondary !bg-opacity-20 !rounded-lg !border-2 !border-secondary"
        data-form="15RKRt"
      />
    </div>
  );
}
