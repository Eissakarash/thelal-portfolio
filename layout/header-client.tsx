"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { InstagramIcon, Linkedin, Mail } from "lucide-react";
import Logo from "@/images/logo.png";
import { Link } from "@/utils/navigation";
import LocaleSwitcher from "@/ui/atoms/locale-switcher";
import X from "@/images/x-social.svg";
import Whatsapp from "@/images/whatsapp-social.svg";

type NavigationItem = { id: string; label: string; featured?: boolean };
type SocialLinks = { instagram?: string | null; linkedin?: string | null; x?: string | null; whatsapp?: string | null; mail?: string | null };

export default function HeaderClient({ items, socials }: { items: NavigationItem[]; socials: SocialLinks }) {
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => setCompact(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-28% 0px -58% 0px", threshold: [0.02, 0.15, 0.35] });
    items.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });
    return () => { window.removeEventListener("scroll", handleScroll); observer.disconnect(); };
  }, [items]);

  return (
    <header
      className={
        compact
          ? "fixed inset-x-0 top-0 z-[100] border-b border-[#c88a5b]/20 bg-[#1b1a18]/95 shadow-[0_8px_28px_rgba(0,0,0,0.22)] backdrop-blur"
          : "fixed inset-x-0 top-0 z-[100] border-b border-transparent bg-[#1b1a18]/90 backdrop-blur"
      }
    >
      <div
        className={
          compact
            ? "mx-auto flex min-h-[64px] max-w-7xl items-center justify-between gap-5 px-5 transition-all duration-300"
            : "mx-auto flex min-h-[88px] max-w-7xl items-center justify-between gap-5 px-5 transition-all duration-300"
        }
      >
        <Link href="/#home" aria-label="ظِلال">
          <Image
            src={Logo}
            alt="ظِلال"
            className={
              compact
                ? "w-20 object-contain brightness-0 invert opacity-95 transition-all duration-300"
                : "w-28 object-contain brightness-0 invert opacity-95 transition-all duration-300"
            }
          />
        </Link>

        <nav className="hidden md:block" aria-label="التنقل الرئيسي">
          <ul className="flex items-center justify-center gap-3 text-sm font-semibold lg:gap-5">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  className={
                    item.featured
                      ? "rounded-full border border-[#c88a5b]/70 px-4 py-2 text-[#f4c99f] transition hover:bg-[#c88a5b] hover:text-[#1b1a18]"
                      : active === item.id
                        ? "relative block px-1 py-3 text-[#f4c99f] transition"
                        : "relative block px-1 py-3 text-white/85 transition hover:text-[#f4c99f]"
                  }
                >
                  {item.label}
                  {!item.featured ? (
                    <span
                      className={
                        active === item.id
                          ? "absolute bottom-1 left-1 right-1 h-px origin-center scale-x-100 bg-[#c88a5b] transition-transform duration-300"
                          : "absolute bottom-1 left-1 right-1 h-px origin-center scale-x-0 bg-[#c88a5b] transition-transform duration-300"
                      }
                    />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 text-[#f4c99f] lg:flex">
          {socials.instagram ? (
            <a href={socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full p-2 transition hover:bg-white/10">
              <InstagramIcon size={18} />
            </a>
          ) : null}
          {socials.linkedin ? (
            <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full p-2 transition hover:bg-white/10">
              <Linkedin size={18} />
            </a>
          ) : null}
          {socials.x ? (
            <a href={socials.x} target="_blank" rel="noreferrer" aria-label="X" className="rounded-full p-2 transition hover:bg-white/10">
              <Image src={X} alt="X" className="h-[18px] w-[18px] brightness-0 invert" />
            </a>
          ) : null}
          {socials.whatsapp ? (
            <a href={socials.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="rounded-full p-2 transition hover:bg-white/10">
              <Image src={Whatsapp} alt="WhatsApp" className="h-[18px] w-[18px] brightness-0 invert" />
            </a>
          ) : null}
          {socials.mail ? (
            <a href={`mailto:${socials.mail}`} aria-label="Email" className="rounded-full p-2 transition hover:bg-white/10">
              <Mail size={18} />
            </a>
          ) : null}
          <span className="ml-1 border-l border-white/15 pl-2">
            <LocaleSwitcher />
          </span>
        </div>
      </div>
    </header>
  );
}
