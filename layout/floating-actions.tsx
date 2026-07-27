"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Whatsapp from "@/images/whatsapp-social.svg";

export default function FloatingActions({ whatsapp }: { whatsapp?: string | null }) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 start-5 z-[90] flex flex-col items-center gap-3 md:bottom-8 md:start-8">
      {showTop ? (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="العودة إلى أعلى الصفحة"
          className="grid h-12 w-12 place-items-center rounded-full border border-[#c88a5b]/70 bg-[#1b1a18]/95 text-[#f4c99f] shadow-lg backdrop-blur transition hover:-translate-y-1 hover:bg-[#c88a5b] hover:text-[#1b1a18]"
        >
          <ArrowUp size={21} />
        </button>
      ) : null}

      {whatsapp ? (
        <a
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          aria-label="تواصل معنا عبر واتساب"
          className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_28px_rgba(37,211,102,0.38)] transition hover:scale-110"
        >
          <span className="absolute inset-0 rounded-full bg-[#25d366]/55 animate-[whatsapp-pulse_2.1s_ease-out_infinite]" />
          <Whatsapp className="relative z-10 h-7 w-7 fill-current" />
        </a>
      ) : null}
    </div>
  );
}
