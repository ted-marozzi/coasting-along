"use client";
import { Link } from "@nextui-org/react";

export default function NotFound() {
  return (
    <div className="py-3 h-96">
      <h1 className="my-6">Oh no!</h1>
      <p className="my-6">This page has gone missing.</p>
      <Link href="/" color="secondary">
        Return Home
      </Link>
    </div>
  );
}
