import React from "react";
import { InstagramIcon, Linkedin, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Logo from "@/images/logo.png";
import { Link } from "@/utils/navigation";
import LocaleSwitcher from "@/ui/atoms/locale-switcher";
import X from "@/images/x-social.svg";
import Whatsapp from "@/images/whatsapp-social.svg";
import prisma from "@/lib/prisma";
import SideBar from "./side-bar";

async function Header({ lang }: { lang: "ar" | "en" }) {
  const t = await getTranslations("common");
  const values = (await prisma.home.findFirst().catch((error) => {
    console.error(error);
    return;
  })) as any;

  return (
    <>
      <div className="max-md:p-4 sticky z-10 bg-white top-0 md:grid grid-cols-3 max-md:grid-cols-2 max-md:gap-2 items-center w-full pt-5 hidden">
        <Link href="/" className="text-5xl font-bold text-black me-auto">
          <Image src={Logo} alt="logo" className="w-32 object-contain" />
        </Link>

        <ul className="flex justify-center gap-3 text-sm max-md:order-3 group text-natural-dark cursor-pointer hover:text-natural-dark/20 duration-200">
          <li className="hover:text-opacity-100 hover:text-natural-dark text-nowrap">
            <Link href="/">{t("home")}</Link>
          </li>
          <li className="hover:text-opacity-100 hover:text-natural-dark text-nowrap">
            <Link href="/design">{t("design")}</Link>
          </li>
          <li className="hover:text-opacity-100 hover:text-natural-dark text-nowrap">
            <Link href="/build">{t("build")}</Link>
          </li>
          <li className="hover:text-opacity-100 hover:text-natural-dark text-nowrap">
            <Link href="/services">
              {lang === "ar" ? "الخدمات" : "Services"}
            </Link>
          </li>
          <li className="hover:text-opacity-100 hover:text-natural-dark text-nowrap">
            <Link href="/our-blog">{t("our-blog")}</Link>
          </li>
          <li className="hover:text-opacity-100 hover:text-natural-dark text-nowrap">
            <Link href="/team">{t("team")}</Link>
          </li>

          <li className="hover:text-opacity-100 hover:text-natural-dark text-nowrap">
            <Link href="/contact-us"> {t("contact")}</Link>
          </li>
        </ul>

        <div className="flex shrink-0 gap-3 text-natural group cursor-pointer hover:text-opacity-50 duration-200 ms-auto">
          <a
            target="_blank"
            href={values?.instagram}
            className="hover:text-opacity-100  hover:text-natural"
          >
            <InstagramIcon />
          </a>
          <a
            target="_blank"
            href={values?.linkedin}
            className="hover:text-opacity-100  hover:text-natural"
          >
            <Linkedin />
          </a>
          <a
            target="_blank"
            href={values?.x}
            className="hover:text-opacity-100  hover:text-natural"
          >
            <X className="fill-current size-5 mt-1" />
          </a>

          <a
            target="_blank"
            href={values?.whatsapp}
            className="hover:text-opacity-100  hover:text-natural"
          >
            <Whatsapp className="fill-current  size-6" />
          </a>

          <a
            target="_blank"
            href={values?.mail}
            className="hover:text-opacity-100  hover:text-natural"
          >
            <Mail />
          </a>

          <LocaleSwitcher />
        </div>
      </div>
      <SideBar values={values} />
    </>
  );
}

export default Header;
