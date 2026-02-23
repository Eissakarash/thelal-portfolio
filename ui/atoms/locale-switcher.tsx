"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "@/utils/navigation";
import { Languages } from "lucide-react";

export default function LocaleSwitcher() {
  const { replace } = useRouter();

  const fullPath = usePathname();
  const lang = useLocale();
  const [isLoading, startTransition] = useTransition();

  const redirectedPathName = async (value: any) => {
    const locale = value.value;
    startTransition(() => {
      const path = fullPath.replace(lang, "");

      replace("/" + locale + "/" + path);
    });
  };

  const options = [
    { value: "en", label: "EN 🇬🇧" },
    { value: "ar", label: "AR 🇲🇦" },
  ];

  return (
    <span className="hover:text-opacity-100 ps-2 hover:text-natural">
      <Languages
        onClick={() => {
          redirectedPathName({ value: lang === "en" ? "ar" : "en" });
        }}
      />
    </span>
  );
}
