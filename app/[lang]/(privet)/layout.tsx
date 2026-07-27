import React from "react";
import Image from "next/image";
import { ArrowUpRight, Building2, LayoutDashboard, Mail, Newspaper, Palette, UsersRound } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/utils/navigation";
import Logo from "@/assets/images/logo-2.png";

type NavigationItem = {
  href: string;
  translationKey: "home" | "design" | "build" | "contact" | "our-blog" | "team";
  icon: React.ElementType;
};

function Layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("common");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const navigation: NavigationItem[] = [
    { href: "/dashboard", translationKey: "home", icon: LayoutDashboard },
    { href: "/dashboard/design", translationKey: "design", icon: Palette },
    { href: "/dashboard/build", translationKey: "build", icon: Building2 },
    { href: "/dashboard/contact", translationKey: "contact", icon: Mail },
    { href: "/dashboard/our-blog", translationKey: "our-blog", icon: Newspaper },
    { href: "/dashboard/team", translationKey: "team", icon: UsersRound },
  ];

  return (
    <div className="min-h-screen bg-[#f4f0e9] text-[#262521]" dir={isArabic ? "rtl" : "ltr"}>
      <aside className="fixed inset-y-0 hidden w-[284px] flex-col border-e border-[#d9cfc1] bg-[#24231f] px-5 py-7 text-[#f8f4ec] lg:flex">
        <Link href="/dashboard" className="flex items-center rounded-md px-3 py-3 transition hover:bg-white/5">
          <Image src={Logo} alt="Thelal" className="h-auto w-32 brightness-0 invert" priority />
        </Link>

        <div className="mt-10 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d2a173]">
          {isArabic ? "لوحة التحكم" : "Control panel"}
        </div>

        <nav className="mt-4 space-y-1" aria-label={isArabic ? "أقسام لوحة التحكم" : "Dashboard sections"}>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                href={item.href}
                key={item.href}
                className="group flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-white/70 transition hover:bg-[#c88a5b] hover:text-[#211f1b]"
              >
                <Icon size={18} strokeWidth={1.8} className="text-[#e7bd96] transition group-hover:text-[#211f1b]" />
                <span>{t(item.translationKey)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/10 px-3 pt-6">
          <Link href="/" className="flex items-center justify-between text-sm text-[#e7bd96] transition hover:text-white">
            <span>{isArabic ? "عرض الموقع" : "View website"}</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </aside>

      <div className="lg:ps-[284px]">
        <header className="sticky top-0 z-30 border-b border-[#ded4c6] bg-[#f8f5ef]/95 px-5 py-4 backdrop-blur md:px-9 lg:px-12">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium tracking-[0.12em] text-[#a86f44]">THELAL</p>
              <h1 className="mt-1 text-base font-semibold text-[#27251f]">{isArabic ? "إدارة محتوى ظِلال" : "Thelal content management"}</h1>
            </div>
            <Link href="/" className="inline-flex items-center gap-2 rounded-sm border border-[#c88a5b] px-3 py-2 text-sm font-medium text-[#7b4e2f] transition hover:bg-[#c88a5b] hover:text-[#211f1b]">
              <span className="hidden sm:inline">{isArabic ? "الموقع" : "Website"}</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden" aria-label={isArabic ? "أقسام لوحة التحكم" : "Dashboard sections"}>
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="flex shrink-0 items-center gap-2 rounded-sm border border-[#ded4c6] bg-white/60 px-3 py-2 text-sm text-[#4b4841]">
                  <Icon size={16} className="text-[#a86f44]" />
                  {t(item.translationKey)}
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="mx-auto min-h-[calc(100vh-88px)] max-w-[1600px] p-5 md:p-9 lg:p-12">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
