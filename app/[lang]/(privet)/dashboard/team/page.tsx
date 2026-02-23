import { getAllAuthors } from "@/actions/blog";
import { Link } from "@/utils/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";
import Avatar from "@/images/avatar.jpg";
import { Button } from "@/ui/atoms";
import { AuthorType } from "@/schema";

async function Author({ params: { lang } }: { params: { lang: "ar" | "en" } }) {
  const t = await getTranslations("common");
  const data = (await getAllAuthors()) as any;

  return (
    <div className="py-10 space-y-10">
      <Link href="/dashboard/team/new">
        <Button>{t("new_member")}</Button>
      </Link>

      <div className="grid lg:grid-cols-3  md:grid-cols-3 2xl:grid-cols-4 gap-6">
        {data?.map((item: AuthorType) => (
          <Link
            href={`/dashboard/team/${item.id}`}
            key={item.id}
            className="flex relative flex-col grow  w-full  max-md:px-5 "
          >
            <Image
              loading="lazy"
              src={item.image || Avatar}
              alt={`Portrait of ${item.name}`}
              width={100}
              height={100}
              className="w-full h-full object-cover aspect-square "
            />
            <div className="p-2">
              <h2 className="self-stretch text-lg text-zinc-800">
                {item.name[lang]}
              </h2>
              <p className="text-zinc-500">{item.job_title[lang]}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Author;
