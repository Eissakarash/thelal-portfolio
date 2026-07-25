import { getTranslations } from "next-intl/server";
import React from "react";
import Image from "next/image";
import { Link } from "@/utils/navigation";
import prisma from "@/lib/prisma";
import { Build } from "@/schema";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}) {
  const t = await getTranslations("common");

  return {
    title: t("build"),
    alternates: {
      canonical: params.lang === "en" ? `/build` : `/${params.lang}/build`,
      languages: {
        en: "/build",
        "en-US": "/build",
        "en-au": "/build",
        "en-bz": "/build",
        "en-ca": "/build",
        "en-ie": "/build",
        "en-jm": "/build",
        "en-nz": "/build",
        "en-za": "/build",
        "en-tt": "/build",
        "en-gb": "/build",
        "en-us": "/build",
        "ar-AR": "/ar/build",
        "ar-dz": "/ar/build",
        "ar-bh": "/ar/build",
        "ar-eg": "/ar/build",
        "ar-iq": "/ar/build",
        "ar-jo": "/ar/build",
        "ar-kw": "/ar/build",
        "ar-lb": "/ar/build",
        "ar-ly": "/ar/build",
        "ar-ma": "/ar/build",
        "ar-om": "/ar/build",
        "ar-qa": "/ar/build",
        "ar-sa": "/ar/build",
        "ar-sy": "/ar/build",
        "ar-tn": "/ar/build",
        "ar-ae": "/ar/build",
        "ar-ye": "/ar/build",
      },
    },
    // openGraph: {
    //   title: t("build"),
    //   url: `https://thelal.com/${params.lang}/build`,
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
const BuildPage = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const t = await getTranslations("common");
  const values = (await prisma.buildCategory
    .findMany({
      include: {
        Build: true,
      },
    })
    .catch((error) => {
      console.error(error);
      return;
    })) as any;
  return (
    <div className="min-h-screen bg-[#f7f6f3] py-14 md:py-20">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] text-[#b9784d]">{lang === "ar" ? "من الموقع إلى التفاصيل" : "FROM SITE TO DETAIL"}</p>
          <h1 className="text-4xl font-semibold text-[#1d211f] md:text-5xl">{t("build")}</h1>
          <p className="mt-4 text-base leading-8 text-[#5d625f]">{lang === "ar" ? "تنفيذ مدروس يترجم الرؤية إلى مكان متقن ومتكامل." : "Considered delivery that turns vision into a refined, complete place."}</p>
        </div>
        {values?.map((value: any) => (
          <section key={value.id} className="border-t border-[#d7d2ca] pt-8">
            {!!value?.Build.length && (
              <h2 className="mb-7 text-2xl font-semibold text-[#1d211f] md:text-3xl">
                {value.name[lang]}
              </h2>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {value?.Build?.map((build: Build) => (
                <Link key={build.id} href={`/build/${build.id}`} className="group relative block overflow-hidden bg-[#171817]">
                  <Image
                    width={300}
                    height={300}
                    src={build.thumbnail}
                    alt="section-image"
                    className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-5 pb-5 pt-16 text-sm font-medium text-white">{build.title?.[lang]}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default BuildPage;
