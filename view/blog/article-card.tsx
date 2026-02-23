import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { ArrowRightIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import dayjs from "dayjs";
import Autherimage from "@/images/avatar.jpg";

interface AuthorProps {
  image: string;
  name: string;
}

const Author: React.FC<AuthorProps> = ({ image, name }) => (
  <div className="flex gap-2">
    <Image
      loading="lazy"
      width={30}
      height={30}
      src={image || Autherimage}
      alt={`${name}'s avatar`}
      className="shrink-0 w-7 rounded-full aspect-square object-contain"
    />
    <div className="my-auto">{name}</div>
  </div>
);

interface ArticleProps {
  image: string | null | undefined;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  author: AuthorProps;
  date: string;
  vertical?: boolean;
  href: string;
}

const ArticleCard: React.FC<ArticleProps> = ({
  image,
  title,
  description,
  author,
  date,
  vertical,
  href,
}) => {
  const lang = useLocale() as "en" | "ar";
  const t = useTranslations("common");

  return (
    <article
      className={cn(
        "grow p-3 rounded-lg border border-solid border-stone-300 max-lg:mt-6 max-lg:max-w-full",
        {
          "border-none p-0": vertical,
        }
      )}
    >
      <Link
        href={href}
        className={cn("flex gap-5 max-lg:flex-col max-lg:gap-0  h-full", {
          "flex flex-col gap-3": vertical,
        })}
      >
        {image && (
          <div className="flex flex-col max-lg:ml-0 max-lg:w-full h-full ">
            <Image
              loading="lazy"
              width={300}
              height={200}
              src={image}
              alt={title[lang]}
              className={cn(
                "rounded-lg object-cover  w-full max-lg:mt-5 h-full",
                {
                  "w-full h-[180px]": vertical,
                }
              )}
            />
          </div>
        )}

        <div
          className={cn("flex flex-col  w-[54%] max-lg:ml-0 max-lg:w-full", {
            "w-full h-full": vertical,
          })}
        >
          <div className="flex flex-col grow max-lg:mt-5 h-full ">
            <h2 className="text-sm  font-bold">{title[lang]}</h2>
            <p className="mt-1.5 text-xs">{description[lang]}</p>
            <div className="flex gap-1.5 justify-between mt-auto pt-2 w-full text-xs leading-4 text-neutral-600">
              {author && (
                <Author
                  image={author?.image}
                  name={author?.name?.[lang as any]}
                />
              )}
              <time className="my-auto">
                {dayjs(date).format("DD-MM-YYYY")}
              </time>
            </div>
          </div>
        </div>
        {vertical && (
          <div className="flex gap-3.5 pr-5 mt-3 text-natural-dark items-center">
            <span>{t("read_more")}</span>
            <span className="rtl:rotate-180">
              <ArrowRightIcon />
            </span>
          </div>
        )}
      </Link>
    </article>
  );
};

export default ArticleCard;
