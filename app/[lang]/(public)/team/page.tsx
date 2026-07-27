import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";
import { getAllAuthors } from "@/actions/blog";
import { AuthorType } from "@/schema";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  const t = await getTranslations("common");

  return {
    title: t("team"),
    alternates: {
      canonical: params.lang === "en" ? "/team" : `/${params.lang}/team`,
    },
  };
}

const TeamPage = async ({ params: { lang } }: { params: { lang: "ar" | "en" } }) => {
  const data = (await getAllAuthors()) as AuthorType[] | undefined;
  const initial = (name?: string) => (name?.trim() || "ظ").charAt(0);
  const title = lang === "ar" ? "فريق ظِلال" : "The Thilal Team";
  const eyebrow = lang === "ar" ? "خلف كل مساحة متقنة" : "THE PEOPLE BEHIND EACH DETAIL";
  const description = lang === "ar"
    ? "فريق يجمع الخبرة المعمارية والاهتمام بالتفاصيل ليحوّل الرؤية إلى مساحات مميزة."
    : "A team that combines architectural expertise and thoughtful detail to turn vision into distinctive spaces.";

  return (
    <main className="min-h-screen bg-[#f3f0eb] pb-20 pt-12 md:pb-28 md:pt-20" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-[1320px] px-5 md:px-10 lg:px-12">
        <header className="mb-10 grid gap-8 border-b border-[#d8d0c6] pb-10 md:mb-14 md:grid-cols-[1.15fr_.85fr] md:items-end md:pb-14">
          <div>
            <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-[#b9784d]">{eyebrow}</p>
            <h1 className="text-4xl font-semibold leading-tight text-[#222522] md:text-6xl">{title}</h1>
          </div>
          <p className="max-w-md text-base leading-8 text-[#60625e] md:text-lg">{description}</p>
        </header>

        {data?.length ? (
          <section className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((team, index) => (
              <article key={team.id} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#292b29]">
                  {team.image ? (
                    <Image
                      src={team.image}
                      alt={team.name?.[lang] || "Team member"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[linear-gradient(145deg,#212321,#4d4136)] text-8xl font-semibold text-[#d5a274]">
                      {initial(team.name?.[lang])}
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-5 end-5 flex size-10 items-center justify-center rounded-full border border-white/50 bg-white/10 text-xs font-medium text-white backdrop-blur-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="border-b border-[#d8d0c6] py-5">
                  <h2 className="text-2xl font-semibold text-[#242622]">{team.name?.[lang]}</h2>
                  <p className="mt-2 text-sm font-medium text-[#ad7148]">{team.job_title?.[lang]}</p>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <div className="border border-dashed border-[#cfc4b7] bg-white/50 px-6 py-16 text-center text-[#666861]">
            {lang === "ar" ? "سيُعرض أعضاء فريق ظِلال هنا قريبًا." : "Team members will appear here soon."}
          </div>
        )}
      </div>
    </main>
  );
};

export default TeamPage;
