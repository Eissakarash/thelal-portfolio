import { getTranslations } from "next-intl/server";
import React from "react";
import Image from "next/image";
import { Link } from "@/utils/navigation";
import prisma from "@/lib/prisma";
import { Design } from "@/schema";

const DesignPage = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const t = await getTranslations("common");
  const values = (await prisma.designCategory
    .findMany({
      include: {
        Design: true,
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
          <p className="mb-3 text-xs font-medium tracking-[0.2em] text-[#b9784d]">{lang === "ar" ? "أعمال مختارة" : "SELECTED WORK"}</p>
          <h1 className="text-4xl font-semibold text-[#1d211f] md:text-5xl">{t("design")}</h1>
          <p className="mt-4 text-base leading-8 text-[#5d625f]">{lang === "ar" ? "مشاريع مصممة لتوازن الجمال، الوظيفة، وهوية المكان." : "Projects designed to balance beauty, function, and a sense of place."}</p>
        </div>
        {values?.map((value: any) => (
          <section key={value.id} className="border-t border-[#d7d2ca] pt-8">
            {!!value?.Design.length && (
              <h2 className="mb-7 text-2xl font-semibold text-[#1d211f] md:text-3xl">
                {value.name[lang]}
              </h2>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {value?.Design?.map((design: Design) => (
                <Link key={design.id} href={`/design/${design.id}`} className="group relative block overflow-hidden bg-[#171817]">
                  <Image
                    width={300}
                    height={300}
                    src={design.thumbnail}
                    alt="section-image"
                    className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-5 pb-5 pt-16 text-sm font-medium text-white">{design.title?.[lang]}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default DesignPage;
