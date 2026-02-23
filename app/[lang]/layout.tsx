import { Cairo } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Toaster } from "sonner";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const t = await getTranslations("common");
  return {
    title: {
      template: `${t("thelal")} | %s`,
      default: t("thelal"),
    },
    description: t("description"),
  };
}

const cairo_font = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm",
});

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const messages = useMessages();

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${cairo_font.variable}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
      {/* <GoogleAnalytics gaId="G-H36G0XE1N1" />
      <GoogleTagManager gtmId="GTM-KLSCJTZ2" /> */}
    </html>
  );
}
