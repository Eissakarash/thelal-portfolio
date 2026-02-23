import MainLayoutPage from "@/layout/main-layout";

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {
    lang: "ar" | "en";
  };
}) {
  return <MainLayoutPage lang={lang}>{children}</MainLayoutPage>;
}
