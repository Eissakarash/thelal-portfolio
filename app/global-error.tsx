"use client";

import Error500 from "@/view/Error/Error500";

export default function GlobalError({
  error,
  reset,
}: {
  error: any;
  reset: any;
}) {
  return <Error500 reset={reset} error={error} />;
}
