import { Text } from "@/ui/atoms";
import React from "react";
import Image from "next/image";
import SumpSlider from "@/ui/molecules/sump-carosul";
import { getAuthorById } from "@/actions/blog";
import { AuthorType } from "@/schema";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { id, lang },
}: {
  params: { id: string; lang: "ar" | "en" };
}) {
  const t = await getTranslations("common");
  const data = (await getAuthorById(+id)) as any;
  return {
    title: `${t("team")} | ${data?.name?.[lang]}`,

    alternates: {
      canonical: lang === "en" ? `/team/${id}` : `/${lang}/team/${id}`,
      languages: {
        en: `/team/${id}`,
        "en-US": `/team/${id}`,
        "en-au": `/team/${id}`,
        "en-bz": `/team/${id}`,
        "en-ca": `/team/${id}`,
        "en-ie": `/team/${id}`,
        "en-jm": `/team/${id}`,
        "en-nz": `/team/${id}`,
        "en-za": `/team/${id}`,
        "en-tt": `/team/${id}`,
        "en-gb": `/team/${id}`,
        "en-us": `/team/${id}`,
        "ar-AR": `/ar/team/${id}`,
        "ar-dz": `/ar/team/${id}`,
        "ar-bh": `/ar/team/${id}`,
        "ar-eg": `/ar/team/${id}`,
        "ar-iq": `/ar/team/${id}`,
        "ar-jo": `/ar/team/${id}`,
        "ar-kw": `/ar/team/${id}`,
        "ar-lb": `/ar/team/${id}`,
        "ar-ly": `/ar/team/${id}`,
        "ar-ma": `/ar/team/${id}`,
        "ar-om": `/ar/team/${id}`,
        "ar-qa": `/ar/team/${id}`,
        "ar-sa": `/ar/team/${id}`,
        "ar-sy": `/ar/team/${id}`,
        "ar-tn": `/ar/team/${id}`,
        "ar-ae": `/ar/team/${id}`,
        "ar-ye": `/ar/team/${id}`,
      },
    },
    // openGraph: {
    //   title: t("build"),
    //   url: `https://thelal.com/${lang}/build`,
    //   images: [
    //     {
    //       url: `${process.env.images_domain}/apple-touch-icon-144x144.png`,
    //       width: 144,
    //       height: 144,
    //       alt: t("titles.leagues"),
    //     },
    //   ],
    // },
  };
}

async function TeamDetails({
  params: { id, lang },
}: {
  params: { id: string; lang: "ar" | "en" };
}) {
  const t = await getTranslations("common");
  let data = (await getAuthorById(+id)) as any;

  // Fallback data for sample authors
  if (!data) {
    const sampleData: Record<string, any> = {
      '1': {
        name: { en: 'John Doe', ar: 'جون دو' },
        job_title: { en: 'Architect', ar: 'مهندس معماري' },
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
      },
      '2': {
        name: { en: 'Jane Smith', ar: 'جين سميث' },
        job_title: { en: 'Interior Designer', ar: 'مصمم داخلي' },
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400'
      },
      '3': {
        name: { en: 'Mike Johnson', ar: 'مايك جونسون' },
        job_title: { en: 'Project Manager', ar: 'مدير مشاريع' },
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
      }
    };
    data = sampleData[id] || null;
  }
  return (
    <div className="space-y-10 mt-10 max-md:p-6">
      {data?.image && (
        <Image
          src={data.image}
          width={400}
          height={400}
          alt={`Portrait of ${data?.name?.[lang]}`}
          className="w-full h-full object-cover aspect-square mx-auto"
        />
      )}

      <Text as="h1">{data?.name?.[lang]}</Text>
      <div>
        <p className="text-lg">{data?.job_title?.[lang]}</p>
      </div>
    </div>
  );
}

export default TeamDetails;
