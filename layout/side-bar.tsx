"use client";
import { Link } from "@/utils/navigation";
import Image from "next/image";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/ui/atoms/sheet";
import Logo from "@/images/logo.png";
import { Button } from "@/ui/atoms";
import { InstagramIcon, Linkedin, Mail, Menu } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import X from "@/images/x-social.svg";
import Whatsapp from "@/images/whatsapp-social.svg";
import LocaleSwitcher from "@/ui/atoms/locale-switcher";

function SideBar({ values }: { values: any }) {
  const t = useTranslations("common");
  const lang = useLocale();
  return (
    <div className="md:hidden top-0 z-10 sticky bg-white flex justify-between items-center w-full p-5">
      <Link href="/" className="text-5xl font-bold text-black">
        <Image src={Logo} alt="logo" className="w-32 object-contain" />
      </Link>
      <Sheet>
        <SheetTrigger>
          <Button as="div" variant="outline">
            <Menu />
          </Button>
        </SheetTrigger>

        <SheetContent
          side={lang === "en" ? "left" : "right"}
          className="space-y-8 pt-20"
        >
          <Link href="/" className="text-5xl font-bold text-black ms-auto ">
            <Image src={Logo} alt="logo" className="w-32 object-contain" />
          </Link>
          <ul className="flex flex-col gap-6 max-md:order-3 group text-natural-dark cursor-pointer hover:text-natural-dark/20 duration-200">
            <Link href="/">
              <SheetClose className="hover:text-opacity-100 hover:text-natural-dark text-nowrap">
                {t("home")}
              </SheetClose>
            </Link>
            <Link href="/design">
              <SheetClose className="hover:text-opacity-100 hover:text-natural-dark text-nowrap">
                {t("design")}
              </SheetClose>
            </Link>
            <Link href="/build">
              <SheetClose className="hover:text-opacity-100 hover:text-natural-dark text-nowrap">
                {t("build")}
              </SheetClose>
            </Link>
            <Link href="/our-blog">
              <SheetClose className="hover:text-opacity-100 hover:text-natural-dark text-nowrap">
                {t("our-blog")}
              </SheetClose>
            </Link>
            <Link href="/team">
              <SheetClose className="hover:text-opacity-100 hover:text-natural-dark text-nowrap">
                {t("team")}
              </SheetClose>
            </Link>

            <Link href="/contact-us">
              <SheetClose className="hover:text-opacity-100 hover:text-natural-dark text-nowrap">
                {t("contact")}
              </SheetClose>
            </Link>
          </ul>
          <div className="flex gap-3 text-natural group cursor-pointer hover:text-opacity-50 duration-200 ">
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

            <span className="hover:text-opacity-100  hover:text-natural">
              <Mail />
            </span>

            <LocaleSwitcher />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default SideBar;
