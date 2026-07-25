import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { ArrowRightIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import dayjs from "dayjs";
import AuthorImage from "@/images/avatar.jpg";

interface AuthorProps { image: string; name: any; }
interface ArticleProps { image: string | null | undefined; title: { en: string; ar: string }; description: { en: string; ar: string }; author: AuthorProps; date: string; vertical?: boolean; href: string; }

const ArticleCard: React.FC<ArticleProps> = ({ image, title, description, author, date, vertical, href }) => {
  const lang = useLocale() as "en" | "ar";
  const t = useTranslations("common");
  return (
    <article className={cn("overflow-hidden bg-white shadow-[0_18px_45px_rgba(27,29,28,0.07)] transition duration-300 hover:-translate-y-1", { "h-full": vertical })}>
      <Link href={href} className={cn("grid h-full md:grid-cols-[0.9fr_1.1fr]", { "block": vertical })}>
        {image && <Image loading="lazy" width={600} height={420} src={image} alt={title[lang]} className={cn("h-full min-h-[230px] w-full object-cover", { "aspect-[4/3]": vertical })} />}
        <div className="flex min-h-[230px] flex-col p-6">
          <p className="text-xs font-medium tracking-[0.16em] text-[#b9784d]">{dayjs(date).format("DD.MM.YYYY")}</p>
          <h2 className="mt-3 text-xl font-semibold leading-snug text-[#1d211f]">{title[lang]}</h2>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#656964]">{description[lang]}</p>
          <div className="mt-auto flex items-center justify-between pt-6 text-xs text-[#767b76]">
            {author && <div className="flex items-center gap-2"><Image loading="lazy" width={28} height={28} src={author.image || AuthorImage} alt="" className="size-7 rounded-full object-cover" />{author.name?.[lang]}</div>}
            {vertical && <span className="inline-flex items-center gap-2 text-[#1d211f]">{t("read_more")} <ArrowRightIcon className="size-4 rtl:rotate-180" /></span>}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
