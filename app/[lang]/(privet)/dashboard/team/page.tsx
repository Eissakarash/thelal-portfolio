import { getAllAuthors } from "@/actions/blog";
import { Link } from "@/utils/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";
import { Button } from "@/ui/atoms";
import { AuthorType } from "@/schema";

async function Author({ params: { lang } }: { params: { lang: "ar" | "en" } }) {
  const t = await getTranslations("common");
  const data = (await getAllAuthors()) as AuthorType[] | undefined;

  return (
    <div className="space-y-8 py-6 md:py-10">
      <div className="flex flex-wrap items-end justify-between gap-5 border-b border-zinc-200 pb-6">
        <div>
          <p className="text-sm text-zinc-500">
            {lang === "ar" ? "إدارة أعضاء فريق ظِلال" : "Manage the Thilal team"}
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-zinc-900">{t("team")}</h1>
        </div>
        <Link href="/dashboard/team/new">
          <Button className="border-[#b9784d] bg-[#b9784d] text-white hover:bg-[#9c603a] hover:text-white">
            {t("new_member")}
          </Button>
        </Link>
      </div>

      <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {data?.map((item: AuthorType) => (
          <Link
            href={`/dashboard/team/${item.id}`}
            key={item.id}
            className="group overflow-hidden border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
              {item.image ? (
                <Image
                  loading="lazy"
                  src={item.image}
                  alt={`Portrait of ${item.name?.[lang]}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-5xl font-semibold text-[#d3a276]">
                  {(item.name?.[lang] || "ظ").charAt(0)}
                </div>
              )}
            </div>
            <div className="p-5">
              <h2 className="text-lg font-semibold text-zinc-900">{item.name?.[lang]}</h2>
              <p className="mt-1 text-sm text-[#a86941]">{item.job_title?.[lang]}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Author;
