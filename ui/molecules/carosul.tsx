"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "../atoms/carousel";
import Image, { StaticImageData } from "next/image";
import { Link } from "@/utils/navigation";
import { useLocale } from "next-intl";

function Slider({ data }: { data: Array<string | StaticImageData> }) {
  const lang = useLocale();
  const isArabic = lang === "ar";

  return (
    <Carousel plugins={[Autoplay({ delay: 5500, stopOnInteraction: true })]} className="w-full overflow-hidden bg-[#171817]">
      <CarouselContent>
        {data?.map((image, index) => (
          <CarouselItem key={index}>
            <section className="relative isolate flex min-h-[calc(100vh-88px)] items-end overflow-hidden md:min-h-[700px]">
              <Image src={image} alt="Thelal architectural work" fill priority={index === 0} sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,20,19,0.88),rgba(18,20,19,0.36)_54%,rgba(18,20,19,0.16))]" />
              <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-20 pt-32 text-white md:px-12 md:pb-28 lg:px-20">
                <p className="mb-5 text-xs font-medium tracking-[0.22em] text-[#f2c49f] md:text-sm">
                  {isArabic ? "ظِلال للهندسة المعمارية" : "THELAL ARCHITECTURE"}
                </p>
                <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
                  {isArabic ? "مساحات تحمل هويةً وتبقى في الذاكرة." : "Spaces shaped by identity, made to endure."}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/80 md:text-lg">
                  {isArabic ? "نصمم وننفذ تجارب معمارية متوازنة، من الفكرة الأولى حتى أدق تفاصيل المكان." : "We design and deliver balanced architectural experiences, from the first idea to the finest detail."}
                </p>
                <Link href="/contact-us" className="mt-9 inline-flex border border-[#c88a5b] bg-[#c88a5b] px-6 py-3 text-sm font-semibold text-[#171817] transition hover:bg-transparent hover:text-[#f2c49f]">
                  {isArabic ? "ابدأ مشروعك" : "Start your project"}
                </Link>
              </div>
              <div className="absolute bottom-7 end-6 flex items-center gap-2 text-xs text-white/70 md:end-12">
                <span className="h-px w-10 bg-[#c88a5b]" /> {String(index + 1).padStart(2, "0")}
              </div>
            </section>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default Slider;
