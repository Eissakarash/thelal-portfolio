import { Text } from "@/ui/atoms";
import ContactForm from "@/view/contact/contact-form";
import { getTranslations } from "next-intl/server";
import React from "react";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: "ar" | "en" };
}) {
  const t = await getTranslations("common");
  return {
    title: `${t("contact-us")}`,

    alternates: {
      canonical: lang === "en" ? `/contact-us` : `/${lang}/contact-us`,
      languages: {
        en: `/contact-us`,
        "en-US": `/contact-us`,
        "en-au": `/contact-us`,
        "en-bz": `/contact-us`,
        "en-ca": `/contact-us`,
        "en-ie": `/contact-us`,
        "en-jm": `/contact-us`,
        "en-nz": `/contact-us`,
        "en-za": `/contact-us`,
        "en-tt": `/contact-us`,
        "en-gb": `/contact-us`,
        "en-us": `/contact-us`,
        "ar-AR": `/ar/contact-us`,
        "ar-dz": `/ar/contact-us`,
        "ar-bh": `/ar/contact-us`,
        "ar-eg": `/ar/contact-us`,
        "ar-iq": `/ar/contact-us`,
        "ar-jo": `/ar/contact-us`,
        "ar-kw": `/ar/contact-us`,
        "ar-lb": `/ar/contact-us`,
        "ar-ly": `/ar/contact-us`,
        "ar-ma": `/ar/contact-us`,
        "ar-om": `/ar/contact-us`,
        "ar-qa": `/ar/contact-us`,
        "ar-sa": `/ar/contact-us`,
        "ar-sy": `/ar/contact-us`,
        "ar-tn": `/ar/contact-us`,
        "ar-ae": `/ar/contact-us`,
        "ar-ye": `/ar/contact-us`,
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

async function Page({ params: { lang } }: { params: { lang: "ar" | "en" } }) {
  const t = await getTranslations("common");
  return (
    <div className="bg-[#f7f6f3] py-14 md:py-20">
      <div className="mx-auto grid max-w-[1160px] gap-10 px-6 md:grid-cols-[0.8fr_1.2fr] md:px-12">
        <aside className="bg-[#171817] p-8 text-white md:p-12">
          <p className="text-xs font-medium tracking-[0.2em] text-[#f2c49f]">{lang === "ar" ? "لنتحدث" : "LET'S TALK"}</p>
          <Text as="h2" className="mt-5 text-4xl leading-tight text-white">{t("send_us_message")}</Text>
          <p className="mt-6 leading-8 text-white/65">{lang === "ar" ? "أخبرنا عن مشروعك، وسنتواصل معك لنبدأ من النقطة المناسبة." : "Tell us about your project and we will get in touch to find the right starting point."}</p>
        </aside>
        <section className="bg-white p-8 shadow-[0_20px_70px_rgba(27,29,28,0.08)] md:p-12">
          <ContactForm />
        </section>
      </div>
    </div>
  );
}

export default Page;
