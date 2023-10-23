"use client";

import { intlFormatDistance } from "date-fns";

export function LastUpdated(p: { date: Date }) {
  return <span>Updated {intlFormatDistance(p.date, new Date())}</span>;
}
