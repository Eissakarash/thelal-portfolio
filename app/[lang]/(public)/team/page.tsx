import { getTranslations } from "next-intl/server";
import React from "react";
import Image from "next/image";
import { Link } from "@/utils/navigation";
import { getAllAuthors } from "@/actions/blog";
import { Author } from "@prisma/client";
import { AuthorType } from "@/schema";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}) {
  const t = await getTranslations("common");

  return {
    title: t("team"),
    alternates: {
      canonical: params.lang === "en" ? `/team` : `/${params.lang}/team`,
      languages: {
        en: "/team",
        "en-US": "/team",
        "en-au": "/team",
        "en-bz": "/team",
        "en-ca": "/team",
        "en-ie": "/team",
        "en-jm": "/team",
        "en-nz": "/team",
        "en-za": "/team",
        "en-tt": "/team",
        "en-gb": "/team",
        "en-us": "/team",
        "ar-AR": "/ar/team",
        "ar-dz": "/ar/team",
        "ar-bh": "/ar/team",
        "ar-eg": "/ar/team",
        "ar-iq": "/ar/team",
        "ar-jo": "/ar/team",
        "ar-kw": "/ar/team",
        "ar-lb": "/ar/team",
        "ar-ly": "/ar/team",
        "ar-ma": "/ar/team",
        "ar-om": "/ar/team",
        "ar-qa": "/ar/team",
        "ar-sa": "/ar/team",
        "ar-sy": "/ar/team",
        "ar-tn": "/ar/team",
        "ar-ae": "/ar/team",
        "ar-ye": "/ar/team",
      },
    },
  };
}
const teamPage = async ({
  params: { lang },
}: {
  params: { lang: "ar" | "en" };
}) => {
  const t = await getTranslations("common");
  const data = (await getAllAuthors()) as any;
  return (
    <div className="min-h-screen bg-[#f7f6f3] py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] text-[#b9784d]">{lang === "ar" ? "الخبرات التي تصنع الفرق" : "THE PEOPLE BEHIND THE WORK"}</p>
          <h1 className="text-4xl font-semibold text-[#1d211f] md:text-5xl">{t("our_team")}</h1>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((team: AuthorType) => (
            <Link key={team.id} href={`/team/${team.id}`} className="group overflow-hidden bg-white shadow-[0_18px_45px_rgba(27,29,28,0.07)]">
              <Image
                loading="lazy"
                src={team.image}
                alt={`Portrait of ${team.name}`}
                width={100}
                height={100}
                className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="p-6">
                <h2 className="self-stretch text-xl font-semibold text-[#1d211f]">
                  {team.name[lang]}
                </h2>
                <p className="mt-1 text-sm text-[#b9784d]">{team.job_title[lang]}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default teamPage;
