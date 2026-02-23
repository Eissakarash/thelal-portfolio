import React from "react";
import Logo from "@/assets/images/logo-2.png";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
function Layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("common");
  const pages = ["design", "build", "contact", "our-blog", "team"];
  return (
    <div className="flex h-screen">
      <div className="w-[300px] bg-black/80 h-full overflow-y-auto">
        <Image src={Logo} alt="logo" className="p-12" />
        <div className="flex flex-col gap-2 p-10 text-white font-bold text-lg h-full overflow-y-auto">
          <Link href="/dashboard" className="p-4  hover:text-white/60">
            {t("home")}
          </Link>
          {pages.map((page) => (
            <Link
              href={`/dashboard/${page}`}
              key={page}
              className="p-4 hover:text-white/60"
            >
              {t(page)}
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full p-10 h-full overflow-y-auto">{children}</div>
    </div>
  );
}

export default Layout;
