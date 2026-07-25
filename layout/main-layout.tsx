import React from "react";
import Header from "./header";
import { getTranslations } from "next-intl/server";

const MainLayoutPage = async ({ children, lang }: { children: React.ReactNode; lang: "ar" | "en" }) => {
  const t = await getTranslations("common");
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f6f3] text-[#1d211f]">
      <Header lang={lang} />
      {children}
      <footer className="border-t border-white/10 bg-[#171817] px-6 py-10 text-center text-sm text-white/55 md:px-12">
        <p>{t("copy_writes", { year: new Date().getFullYear() })}</p>
      </footer>
    </main>
  );
};

export default MainLayoutPage;
