"use client";

import { Link } from "@/utils/navigation";
import Image from "next/image";
import React from "react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/ui/atoms/sheet";
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
  const services = lang === "ar" ? "الخدمات" : "Services";
  const links = [
    ["/", t("home")], ["/design", t("design")], ["/build", t("build")], ["/services", services],
    ["/our-blog", t("our-blog")], ["/team", t("team")], ["/contact-us", t("contact")],
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#171817] px-5 py-4 text-white shadow-lg md:hidden">
      <Link href="/" aria-label="Thelal home"><Image src={Logo} alt="ظِلال" className="w-24 brightness-0 invert" priority /></Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="border-[#c88a5b] bg-transparent text-[#f2c49f] hover:bg-[#c88a5b] hover:text-[#171817]"><Menu /></Button>
        </SheetTrigger>
        <SheetContent side={lang === "en" ? "left" : "right"} className="border-white/10 bg-[#171817] px-7 pt-8 text-white">
          <div className="flex h-full flex-col">
            <Image src={Logo} alt="ظِلال" className="mb-12 w-28 brightness-0 invert" />
            <nav className="flex-1">
              <ul className="space-y-1 text-lg">
                {links.map(([href, label]) => (
                  <li key={href}>
                    <Link href={href}><SheetClose className="w-full rounded-sm px-3 py-3 text-start text-white/85 transition hover:bg-white/10 hover:text-[#f2c49f]">{label}</SheetClose></Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-4 border-t border-white/10 pt-6 text-white/70">
              <a aria-label="Instagram" href={values?.instagram} target="_blank" rel="noreferrer"><InstagramIcon size={20} /></a>
              <a aria-label="LinkedIn" href={values?.linkedin} target="_blank" rel="noreferrer"><Linkedin size={20} /></a>
              <a aria-label="X" href={values?.x} target="_blank" rel="noreferrer"><X className="size-4 fill-current" /></a>
              <a aria-label="WhatsApp" href={values?.whatsapp} target="_blank" rel="noreferrer"><Whatsapp className="size-5 fill-current" /></a>
              <a aria-label="Email" href={values?.mail}><Mail size={20} /></a>
              <LocaleSwitcher />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export default SideBar;
