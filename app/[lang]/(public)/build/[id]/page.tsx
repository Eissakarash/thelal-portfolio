import { Text } from "@/ui/atoms";
import React from "react";
import Image from "next/image";
import SumpSlider from "@/ui/molecules/sump-carosul";
import { getBuild } from "@/actions/build";
import { Build } from "@/schema";
import { getTranslations } from "next-intl/server";
import { metaById } from "@/actions/meta";

export async function generateMetadata({
  params: { id, lang },
}: {
  params: { id: string; lang: "ar" | "en" };
}) {
  const t = await getTranslations("common");
  const data = (await getBuild(+id)) as any;
  const meta = (await metaById(+data?.metaId)) as any;

  return {
    title: `${t("build")} |  ${meta?.title[lang]}`,
    description: meta?.description[lang],

    alternates: {
      canonical: lang === "en" ? `/build/${id}` : `/${lang}/build/${id}`,
      languages: {
        en: `/build/${id}`,
        "en-US": `/build/${id}`,
        "en-au": `/build/${id}`,
        "en-bz": `/build/${id}`,
        "en-ca": `/build/${id}`,
        "en-ie": `/build/${id}`,
        "en-jm": `/build/${id}`,
        "en-nz": `/build/${id}`,
        "en-za": `/build/${id}`,
        "en-tt": `/build/${id}`,
        "en-gb": `/build/${id}`,
        "en-us": `/build/${id}`,
        "ar-AR": `/ar/build/${id}`,
        "ar-dz": `/ar/build/${id}`,
        "ar-bh": `/ar/build/${id}`,
        "ar-eg": `/ar/build/${id}`,
        "ar-iq": `/ar/build/${id}`,
        "ar-jo": `/ar/build/${id}`,
        "ar-kw": `/ar/build/${id}`,
        "ar-lb": `/ar/build/${id}`,
        "ar-ly": `/ar/build/${id}`,
        "ar-ma": `/ar/build/${id}`,
        "ar-om": `/ar/build/${id}`,
        "ar-qa": `/ar/build/${id}`,
        "ar-sa": `/ar/build/${id}`,
        "ar-sy": `/ar/build/${id}`,
        "ar-tn": `/ar/build/${id}`,
        "ar-ae": `/ar/build/${id}`,
        "ar-ye": `/ar/build/${id}`,
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

async function DesignDetails({
  params: { id, lang },
}: {
  params: { id: string; lang: "ar" | "en" };
}) {
  const t = await getTranslations("common");
  let data = (await getBuild(+id)) as any;

  // Fallback data for sample builds
  if (!data) {
    const sampleData: Record<string, any> = {
      '1': {
        images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'],
        title: { en: 'Modern Villa', ar: 'فيلا حديثة' },
        location: { en: 'Dubai, UAE', ar: 'دبي، الإمارات' },
        scope: { en: 'Residential Design', ar: 'تصميم سكني' },
        year: '2023',
        status: { en: 'Completed', ar: 'مكتمل' },
        team: { en: 'John Doe, Jane Smith', ar: 'جون دو، جين سميث' },
        briefing: { en: 'A luxurious modern villa with contemporary design.', ar: 'فيلا فاخرة بتصميم عصري.' },
        briefing_image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
        architectural_solution: { en: 'Open plan design with natural lighting.', ar: 'تصميم مفتوح مع إضاءة طبيعية.' },
        architectural_solution_image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400'
      },
      '2': {
        images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'],
        title: { en: 'Apartment Complex', ar: 'مجمع شقق' },
        location: { en: 'Abu Dhabi, UAE', ar: 'أبوظبي، الإمارات' },
        scope: { en: 'Multi-unit Residential', ar: 'سكن متعدد الوحدات' },
        year: '2022',
        status: { en: 'Completed', ar: 'مكتمل' },
        team: { en: 'Mike Johnson', ar: 'مايك جونسون' },
        briefing: { en: 'Modern apartment complex for urban living.', ar: 'مجمع شقق عصري للحياة الحضرية.' },
        briefing_image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400'
      },
      '3': {
        images: ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'],
        title: { en: 'Office Building', ar: 'مبنى مكاتب' },
        location: { en: 'Sharjah, UAE', ar: 'الشارقة، الإمارات' },
        scope: { en: 'Commercial Design', ar: 'تصميم تجاري' },
        year: '2024',
        status: { en: 'Under Construction', ar: 'قيد الإنشاء' },
        team: { en: 'Sarah Wilson', ar: 'سارة ويلسون' },
        briefing: { en: 'Contemporary office building with sustainable features.', ar: 'مبنى مكاتب عصري مع ميزات مستدامة.' },
        briefing_image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400'
      }
    };
    data = sampleData[id] || null;
  }
  return (
    <div className="space-y-10 mt-10 max-md:p-6">
      <SumpSlider images={data?.images} />

      <Text as="h1">{data?.title?.[lang]}</Text>
      <div>
        <ul className="space-y-4">
          {data?.location?.[lang] && (
            <li>
              <strong>{t("location")}: </strong>
              {data?.location?.[lang]}
            </li>
          )}
          {data?.scope?.[lang] && (
            <li>
              <strong>{t("scope")}: </strong>
              {data?.scope?.[lang]}
            </li>
          )}
          {data?.year && (
            <li>
              <strong>{t("year")}: </strong>
              {data?.year}
            </li>
          )}
          {data?.status?.[lang] && (
            <li>
              <strong>{t("status")}: </strong>
              {data?.status?.[lang]}
            </li>
          )}
          {data?.team?.[lang] && (
            <li>
              <strong>{t("team")}: </strong>
              {data?.team?.[lang]}
            </li>
          )}
        </ul>
      </div>
      {data?.briefing?.[lang] && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10 items-center">
          {data?.briefing_image && (
            <Image
              src={data?.briefing_image}
              width={400}
              height={400}
              alt="section-image"
              className="w-full h-full object-cover aspect-square"
            />
          )}
          <div>
            <Text as="h4">{t("briefing")}:</Text>
            <Text as="span">{data?.briefing?.[lang]}</Text>
          </div>
        </div>
      )}
      {data?.architectural_solution?.[lang] && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10 items-center">
          <div>
            <Text as="h4">{t("architectural_solution")}:</Text>
            <Text as="span">{data?.architectural_solution?.[lang]}</Text>
          </div>
          {data?.architectural_solution_image && (
            <Image
              src={data?.architectural_solution_image}
              alt="section-image"
              width={400}
              height={400}
              className="w-full md:h-full object-cover aspect-square"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default DesignDetails;
