import React from "react";
import { Text } from "@/ui/atoms";
import { getAllblogs, getblog } from "@/actions/blog";
import { getTranslations } from "next-intl/server";
import dayjs from "dayjs";
import ArticleCard from "@/view/blog/article-card";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}) {
  const t = await getTranslations("common");
  const data = await getblog();
  return {
    title: t("our_blog"),
    description: data?.description,
    alternates: {
      canonical:
        params.lang === "en" ? `/our-blog` : `/${params.lang}/our-blog`,
      languages: {
        en: "/our-blog",
        "en-US": "/our-blog",
        "en-au": "/our-blog",
        "en-bz": "/our-blog",
        "en-ca": "/our-blog",
        "en-ie": "/our-blog",
        "en-jm": "/our-blog",
        "en-nz": "/our-blog",
        "en-za": "/our-blog",
        "en-tt": "/our-blog",
        "en-gb": "/our-blog",
        "en-us": "/our-blog",
        "ar-AR": "/ar/our-blog",
        "ar-dz": "/ar/our-blog",
        "ar-bh": "/ar/our-blog",
        "ar-eg": "/ar/our-blog",
        "ar-iq": "/ar/our-blog",
        "ar-jo": "/ar/our-blog",
        "ar-kw": "/ar/our-blog",
        "ar-lb": "/ar/our-blog",
        "ar-ly": "/ar/our-blog",
        "ar-ma": "/ar/our-blog",
        "ar-om": "/ar/our-blog",
        "ar-qa": "/ar/our-blog",
        "ar-sa": "/ar/our-blog",
        "ar-sy": "/ar/our-blog",
        "ar-tn": "/ar/our-blog",
        "ar-ae": "/ar/our-blog",
        "ar-ye": "/ar/our-blog",
      },
    },
    openGraph: {
      title: t("about_us"),
      url: `https://www.m1group-mr.com/${params.lang}/our-blog`,
      type: "website",
    },

    twitter: {
      title: t("about_us"),
      url: `https://www.m1group-mr.com/${params.lang}/our-blog`,
      description: data?.description,
    },
  };
}

const BlogPage = async () => {
  const t = await getTranslations("common");
  const data = await getAllblogs({});
  return (
    <div className="min-h-screen bg-[#f7f6f3] py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-xs font-medium tracking-[0.2em] text-[#b9784d]">{t("recent_news")}</p>
        <Text as="h2" className="text-4xl !leading-tight text-[#1d211f] md:text-5xl">{t("our_blog")}</Text>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {data?.map(
          (item: any) =>
            dayjs(item.date).isAfter(dayjs().subtract(2, "week")) && (
              <ArticleCard
                href={`/our-blog/${item.slug}`}
                key={item.id}
                {...item}
                date={item.date}
              />
            )
        )}
      </div>

      <div className="mt-16 space-y-7">
        <div className="max-w-2xl">
          <Text as="h2" className="text-3xl text-[#1d211f]">{t("our_blog")}</Text>
          <Text as="p">{t("recent_news_description")}</Text>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {data?.map((item: any) => (
            <ArticleCard
              {...item}
              href={`/our-blog/${item.slug}`}
              date={item.date}
              vertical
              key={item.id}
            />
          ))}
        </div>
      </div></div>
    </div>
  );
};

export default BlogPage;
