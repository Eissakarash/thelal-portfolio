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
    <div className="min-h-screen">
      <div className="flex flex-col gap-6 my-10 px-10 py-5 ">
        <h2 className="md:text-[30px] text-[26px] font-bold uppercase ">
          {t("our_team")}
        </h2>
        <div className="grid grid-cols-3 max-md:grid-cols-1  gap-10">
          {data?.map((team: AuthorType) => (
            <Link key={team.id} href={`/team/${team.id}`}>
              <Image
                loading="lazy"
                src={team.image}
                alt={`Portrait of ${team.name}`}
                width={100}
                height={100}
                className="w-full h-full object-cover aspect-square"
              />
              <div className="p-2">
                <h2 className="self-stretch text-lg  text-zinc-800">
                  {team.name[lang]}
                </h2>
                <p className="text-zinc-500">{team.job_title[lang]}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default teamPage;
