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
  const values = await prisma.home.findFirst().catch(() => null);
  const services = lang === "ar" ? "الخدمات" : "Services";

  return (
    <>
      <header className="sticky top-0 z-30 hidden border-b border-white/10 bg-[#171817] text-white shadow-[0_8px_30px_rgba(0,0,0,0.18)] md:block">
        <div className="mx-auto grid min-h-[88px] max-w-[1440px] grid-cols-[auto_1fr_auto] items-center gap-8 px-8 lg:px-12">
          <Link href="/" className="shrink-0" aria-label="Thelal home"><Image src={Logo} alt="ظِلال" className="w-28 object-contain brightness-0 invert" priority /></Link>
          <nav aria-label="Primary navigation" className="justify-self-center">
            <ul className="flex items-center justify-center gap-5 text-sm font-medium text-white/80 lg:gap-7">
              <li><Link className="transition hover:text-[#c88a5b]" href="/#home">{t("home")}</Link></li>
              <li><Link className="transition hover:text-[#c88a5b]" href="/#services">{services}</Link></li>
              <li><Link className="transition hover:text-[#c88a5b]" href="/#projects">{lang === "ar" ? "المشاريع" : "Projects"}</Link></li>
              <li><Link className="transition hover:text-[#c88a5b]" href="/#about">{lang === "ar" ? "من نحن" : "About"}</Link></li>
              <li><Link className="transition hover:text-[#c88a5b]" href="/#team">{t("team")}</Link></li>
              <li><Link className="transition hover:text-[#c88a5b]" href="/#blog">{t("our-blog")}</Link></li>
              <li><Link className="rounded-sm border border-[#c88a5b] px-3 py-2 text-[#f2c49f] transition hover:bg-[#c88a5b] hover:text-[#171817]" href="/#contact">{t("contact")}</Link></li>
            </ul>
          </nav>
          <div className="flex items-center gap-3 text-white/70">
            {values?.instagram && <a aria-label="Instagram" target="_blank" rel="noreferrer" href={values.instagram} className="transition hover:text-[#c88a5b]"><InstagramIcon size={19} /></a>}
            {values?.linkedin && <a aria-label="LinkedIn" target="_blank" rel="noreferrer" href={values.linkedin} className="transition hover:text-[#c88a5b]"><Linkedin size={19} /></a>}
            {values?.x && <a aria-label="X" target="_blank" rel="noreferrer" href={values.x} className="transition hover:text-[#c88a5b]"><X className="size-4 fill-current" /></a>}
            {values?.whatsapp && <a aria-label="WhatsApp" target="_blank" rel="noreferrer" href={values.whatsapp} className="transition hover:text-[#c88a5b]"><Whatsapp className="size-5 fill-current" /></a>}
            {values?.mail && <a aria-label="Email" href={values.mail} className="transition hover:text-[#c88a5b]"><Mail size={19} /></a>}
            <span className="border-s border-white/15 ps-3"><LocaleSwitcher /></span>
          </div>
        </div>
      </header>
      <SideBar values={values} />
    </>
  );
}

export default Header;
