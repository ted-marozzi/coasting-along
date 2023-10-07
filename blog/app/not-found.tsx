"use client";
import { Link } from "@nextui-org/react";

export default function NotFound() {
  return (
    <div className="p-3 h-96">
      <h1 className="my-6">Oopsie x</h1>
      <p className="my-6">This page has gone missing.</p>
      <Link href="/" color="secondary">
        Return Home
      </Link>
    </div>
  );
}
