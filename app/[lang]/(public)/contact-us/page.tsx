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

async function Page() {
  const t = await getTranslations("common");
  return (
    <div className="mx-[15%] space-y-4 pt-10 ">
      <Text as="h2">{t("send_us_message")}</Text>
      <ContactForm />
    </div>
  );
}

export default Page;
