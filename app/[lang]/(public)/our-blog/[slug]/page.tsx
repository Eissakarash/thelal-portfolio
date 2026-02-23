import Image from "next/image";
import React from "react";
import ArticleCard from "@/view/blog/article-card";
import { getBlogBySlug } from "@/actions/blog";
import dayjs from "dayjs";
import { getTranslations } from "next-intl/server";
import { Text } from "@/ui/atoms";
import { metaById } from "@/actions/meta";

export async function generateMetadata({
  params: { lang, slug },
}: {
  params: {
    lang: "ar" | "en";
    slug: string;
  };
}) {
  const t = await getTranslations("common");
  const data = (await getBlogBySlug(slug)) as any;
  const meta = (await metaById(+data?.metaId)) as any;

  return {
    title: `${t("build")} |  ${meta?.title[lang]}`,
    description: meta?.description[lang],
    image: data?.image,
    alternates: {
      canonical:
        lang === "en" ? `/our-blog/${slug}` : `/${lang}/our-blog/${slug}`,
      languages: {
        en: `/our-blog/${slug}`,
        "en-US": `/our-blog/${slug}`,
        "en-au": `/our-blog/${slug}`,
        "en-bz": `/our-blog/${slug}`,
        "en-ca": `/our-blog/${slug}`,
        "en-ie": `/our-blog/${slug}`,
        "en-jm": `/our-blog/${slug}`,
        "en-nz": `/our-blog/${slug}`,
        "en-za": `/our-blog/${slug}`,
        "en-tt": `/our-blog/${slug}`,
        "en-gb": `/our-blog/${slug}`,
        "en-us": `/our-blog/${slug}`,
        "ar-AR": `/ar/our-blog/${slug}`,
        "ar-dz": `/ar/our-blog/${slug}`,
        "ar-bh": `/ar/our-blog/${slug}`,
        "ar-eg": `/ar/our-blog/${slug}`,
        "ar-iq": `/ar/our-blog/${slug}`,
        "ar-jo": `/ar/our-blog/${slug}`,
        "ar-kw": `/ar/our-blog/${slug}`,
        "ar-lb": `/ar/our-blog/${slug}`,
        "ar-ly": `/ar/our-blog/${slug}`,
        "ar-ma": `/ar/our-blog/${slug}`,
        "ar-om": `/ar/our-blog/${slug}`,
        "ar-qa": `/ar/our-blog/${slug}`,
        "ar-sa": `/ar/our-blog/${slug}`,
        "ar-sy": `/ar/our-blog/${slug}`,
        "ar-tn": `/ar/our-blog/${slug}`,
        "ar-ae": `/ar/our-blog/${slug}`,
        "ar-ye": `/ar/our-blog/${slug}`,
      },
    },
    openGraph: {
      //@ts-ignore
      title: data?.title[lang] || "M1 Group",
      url: `https://www.m1group-mr.com/${lang}/our-blog/${slug}`,
      type: "article",
      images: [
        {
          url: data?.image || "/logo.png",
          width: 144,
          height: 144,
          //@ts-ignore
          alt: data?.title[lang],
        },
      ],
    },
  };
}

const SingleAccounting = async ({
  params: { slug, lang },
}: {
  params: { slug: string; lang: string };
}) => {
  const t = await getTranslations("common");
  const data = (await getBlogBySlug(slug)) as any;

  return (
    <div className="mb-32">
      <div className="h-[296px] relative w-full flex flex-col gap-6 items-center justify-center bg-[#282828]">
        <h1 className="z-10 text-[42px] font-bold w-[70%] text-white text-center mx-auto">
          {data?.title[lang]}
        </h1>
        <time className="z-10 lg:text-xl text-sm text-[#CACACA]">
          {dayjs(data?.date[lang]).format("DD-MM-YYYY")}
        </time>
      </div>
      <article className="flex flex-col self-center md:px-[118px] px-6 mt-14 w-full  max-lg:mt-10 max-lg:max-w-full">
        {data?.image && (
          <Image
            loading="lazy"
            width={1000}
            height={1000}
            src={data?.image}
            alt="image"
            className="w-full md:object-fill object-cover aspect-square md:h-[calc(100vh-280px)]  max-lg:mt-5"
          />
        )}

        <div
          className="content_style"
          dangerouslySetInnerHTML={{ __html: data?.content[lang] }}
        />
      </article>

      {Boolean(data.relatedBlogs.length) && (
        <div className="px-[118px] lg:pe-32 space-y-6">
          <Text as="h2">{t("related_news")}</Text>
          <div className="grid grid-cols-4">
            {data.relatedBlogs?.map((item: any) => (
              <ArticleCard
                vertical
                href={`/our-blog/${item.slug}`}
                key={item.slug}
                {...item}
                date={item.date}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleAccounting;
