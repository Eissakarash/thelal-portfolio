import { getTranslations } from "next-intl/server";
import React from "react";
import Image from "next/image";
import SectionImage6 from "@/images/qoute.png";
import { Button, Text } from "@/ui/atoms";
import MapImage from "@/images/map.png";
import SectionImage1 from "@/images/01_2-Photo.png";
import SectionImage2 from "@/images/01_4-Photo.png";
import SectionImage3 from "@/images/01_5-Photo.png";
import ProjectImage1 from "@/images/00-Maquitte.jpg";
import ProjectImage2 from "@/images/Cam_04.jpg";
import { Link } from "@/utils/navigation";
import NumberTicker from "@/ui/molecules/number-ticker";
import prisma from "@/lib/prisma";

const HomeLayout = async ({
  hero,
  params: { lang },
}: {
  hero: React.ReactNode;
  params: { lang: string };
}) => {
  const t = await getTranslations("common");
  const values = (await prisma.home.findFirst().catch((error) => {
    console.error(error);
    return;
  })) as any;
  const build = (await prisma.build.findMany().catch((error) => {
    console.error(error);
    return;
  })) as any;
  const design = (await prisma.design.findMany().catch((error) => {
    console.error(error);
    return;
  })) as any;
  const fallbackDesign = [
    {
      title: { ar: "تصميم داخلي", en: "Interior Design" },
      thumbnail: ProjectImage1,
      href: "/design",
    },
    {
      title: { ar: "هوية المساحة", en: "Space Identity" },
      thumbnail: ProjectImage2,
      href: "/design",
    },
  ];
  const fallbackBuild = [
    {
      title: { ar: "تنفيذ المشاريع", en: "Project Delivery" },
      thumbnail: SectionImage1,
      href: "/build",
    },
    {
      title: { ar: "إدارة الموقع", en: "Site Management" },
      thumbnail: SectionImage2,
      href: "/build",
    },
  ];
  const designItems = design?.length ? design.slice(0, 2) : fallbackDesign;
  const buildItems = build?.length ? build.slice(0, 2) : fallbackBuild;

  return (
    <>
      <div className="md:h-[85vh] h-[93vh]  md:pt-12 p-0">{hero}</div>
      <div className="text-5xl flex gap-10 items-center justify-center  md:py-[200px] my-10 ">
        <div className="flex flex-col items-center">
          <span>
            + <NumberTicker value={Number(values?.project || 0)} />
          </span>
          <Text variant="p"> {t("projects")} </Text>
        </div>
        <div className="flex flex-col items-center">
          <span>
            + <NumberTicker value={Number(values?.client || 0)} />
          </span>
          <Text variant="p"> {t("clients")} </Text>
        </div>
      </div>
      <Image
        src={values?.image_1 || SectionImage1}
        alt="section-image"
        width={1000}
        height={1000}
        className="w-full pb-10 object-cover max-sm:aspect-square"
      />

      <div className="flex flex-col md:gap-16 gap-6 md:px-20  md:my-10 md:py-10 max-sm:px-6">
        <h2 className="md:text-[50px] font-bold text-[32px]">{t("design")}</h2>
        <div className="flex justify-between gap-6">
          {designItems.map((value: any) => (
            <Link
              key={value.id || value.title.en}
              href={value.href || `/design/${value.id}`}
              className="flex flex-col gap-2"
            >
              <Image
                width={383}
                height={383}
                src={value.thumbnail}
                alt="section-image"
                className="w-[383px] aspect-square object-cover"
              />
              <Text as="h2" variant="h2">
                {value.title?.[lang]}
              </Text>
            </Link>
          ))}
        </div>
        <Link href="/design">
          <Button className=" ms-auto">
            {t("view_all_", {
              name: t("design"),
            })}
          </Button>
        </Link>
      </div>

      <Image
        src={values?.image_2 || SectionImage2}
        alt="section-image"
        width={1000}
        height={1000}
        className="w-full  my-20"
      />

      <div className="flex flex-col gap-16 md:px-20   md:my-10 md:py-10 p-6">
        <h2 className="md:text-[50px] font-bold text-[32px]">{t("build")}</h2>
        <div className="flex justify-between gap-6">
          {buildItems.map((value: any) => (
            <Link
              key={value.id || value.title.en}
              href={value.href || `/build/${value.id}`}
              className="flex flex-col gap-2"
            >
              <Image
                width={383}
                height={383}
                src={value.thumbnail}
                alt="section-image"
                className="w-[383px] aspect-square object-cover"
              />
              <Text as="h2" variant="h2">
                {value.title?.[lang]}
              </Text>
            </Link>
          ))}
        </div>
        <Button className="ms-auto">
          {t("view_all_", {
            name: t("build"),
          })}
        </Button>
      </div>

      {values?.location && (
        <Link href={values?.location as string} target="_blank">
          <Image
            src={values?.image_3 || SectionImage3}
            alt="section-image"
            width={1000}
            height={1000}
            className="w-full my-20 "
          />
        </Link>
      )}

      <div className="flex flex-col gap-8 md:px-20  md:py-10 p-6">
        <h2 className="md:text-[50px] font-bold text-[32px] ">
          {t("our_goal")}
        </h2>
        <h3 className="text-lg md:w-1/2  ">
          {values?.aim?.[lang] ||
            (lang === "ar"
              ? "نصمم وننفذ مساحات تعكس هوية العميل وتوازن بين الجمال والوظيفة."
              : "We design and deliver spaces that reflect each client's identity while balancing beauty and function.")}
        </h3>
        <div className="h-[340px] overflow-hidden relative mt-20">
          <a target="_blank" href={values?.location as string}>
            <Image
              src={MapImage}
              alt="map"
              className="h-[340px] w-full object-cover"
            />
          </a>
        </div>
      </div>

      <div className="relative  mt-20 h-[80vh]">
        <div className="space-y-5 absolute text-center start-1/2 top-1/2 rtl:translate-x-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
          <h3 className="text-[31px]">
            "
            {values?.quote?.[lang] ||
              (lang === "ar"
                ? "كل مساحة تبدأ بفكرة، وتكتمل بتفاصيلها."
                : "Every space begins with an idea and comes alive through its details.")}
            "
          </h3>
          <p className="text-lg">
            -{" "}
            {values?.author?.[lang] ||
              (lang === "ar" ? "فريق ذلال" : "Thelal Team")}
          </p>
        </div>
        <Image
          src={values?.quote_image || SectionImage6}
          alt="section-image"
          width={900}
          height={700}
          className="w-full h-full object-cover "
        />
      </div>
    </>
  );
};

export default HomeLayout;
