import { Text } from "@/ui/atoms";
import React from "react";
import Image from "next/image";
import SumpSlider from "@/ui/molecules/sump-carosul";
import { getDesign } from "@/actions/design";
import { Design } from "@/schema";
import { getTranslations } from "next-intl/server";
import { metaById } from "@/actions/meta";

export async function generateMetadata({
  params: { id, lang },
}: {
  params: { id: string; lang: "ar" | "en" };
}) {
  const t = await getTranslations("common");
  const data = (await getDesign(+id)) as any;
  const meta = (await metaById(+data?.metaId)) as any;
  return {
    title: `${t("design")} |  ${meta?.title[lang]}`,
    description: meta?.description[lang],
    alternates: {
      canonical: lang === "en" ? `/design/${id}` : `/${lang}/design/${id}`,
      languages: {
        en: `/design/${id}`,
        "en-US": `/design/${id}`,
        "en-au": `/design/${id}`,
        "en-bz": `/design/${id}`,
        "en-ca": `/design/${id}`,
        "en-ie": `/design/${id}`,
        "en-jm": `/design/${id}`,
        "en-nz": `/design/${id}`,
        "en-za": `/design/${id}`,
        "en-tt": `/design/${id}`,
        "en-gb": `/design/${id}`,
        "en-us": `/design/${id}`,
        "ar-AR": `/ar/design/${id}`,
        "ar-dz": `/ar/design/${id}`,
        "ar-bh": `/ar/design/${id}`,
        "ar-eg": `/ar/design/${id}`,
        "ar-iq": `/ar/design/${id}`,
        "ar-jo": `/ar/design/${id}`,
        "ar-kw": `/ar/design/${id}`,
        "ar-lb": `/ar/design/${id}`,
        "ar-ly": `/ar/design/${id}`,
        "ar-ma": `/ar/design/${id}`,
        "ar-om": `/ar/design/${id}`,
        "ar-qa": `/ar/design/${id}`,
        "ar-sa": `/ar/design/${id}`,
        "ar-sy": `/ar/design/${id}`,
        "ar-tn": `/ar/design/${id}`,
        "ar-ae": `/ar/design/${id}`,
        "ar-ye": `/ar/design/${id}`,
      },
    },
    // openGraph: {
    //   title: t("design"),
    //   url: `https://thelal.com/${lang}/design`,
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
  const data = (await getDesign(+id)) as Design;
  return (
    <div className="space-y-10 mt-10 max-md:p-6">
      <SumpSlider images={data?.images} />

      <Text as="h1">{data?.title?.[lang]}</Text>

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
              className="w-full  md:h-full object-cover aspect-square"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default DesignDetails;
