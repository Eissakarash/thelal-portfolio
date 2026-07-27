import React from "react";
import { getTranslations } from "next-intl/server";
import prisma from "@/lib/prisma";
import SideBar from "./side-bar";
import HeaderClient from "./header-client";

async function Header({ lang }: { lang: "ar" | "en" }) {
  const t = await getTranslations("common");
  const values = await prisma.home.findFirst().catch(() => null);
  const isArabic = lang === "ar";
  const items = [
    { id: "home", label: t("home") },
    { id: "services", label: isArabic ? "الخدمات" : "Services" },
    { id: "projects", label: isArabic ? "المشاريع" : "Projects" },
    { id: "about", label: isArabic ? "من نحن" : "About" },
    { id: "team", label: t("team") },
    { id: "blog", label: t("our-blog") },
    { id: "contact", label: t("contact"), featured: true },
  ];
  const socials = { instagram: values?.instagram, linkedin: values?.linkedin, x: values?.x, whatsapp: values?.whatsapp, mail: values?.mail };
  return <><HeaderClient items={items} socials={socials} /><SideBar values={values} /></>;
}

export default Header;
