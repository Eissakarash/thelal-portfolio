import { Text } from "@/ui/atoms";
import React from "react";
import Image from "next/image";
import SumpSlider from "@/ui/molecules/sump-carosul";
import { getBuild } from "@/actions/build";
import { Build } from "@/schema";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { id, lang },
}: {
  params: { id: string; lang: "ar" | "en" };
}) {
  const t = await getTranslations("common");
  const data = await getBuild(+id);
  return {
    title: `${t("build")} | ${data?.title}`,

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
  const data = (await getBuild(+id)) as any;
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
              className="w-full h-full object-cover aspect-square"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default DesignDetails;
