import { getAllblogs } from "@/actions/blog";
import ArticleCard from "@/view/blog/article-card";
import { Link } from "@/utils/navigation";
import { getTranslations } from "next-intl/server";
import React from "react";
import { Button } from "@/ui/atoms";

async function Page() {
  const t = await getTranslations("common");
  const data = (await getAllblogs({})) as any;

  return (
    <div className="py-10">
      <Link href="/dashboard/our-blog/new">
        <Button>{t("new_blog")}</Button>
      </Link>

      <div className="grid  md:grid-cols-2 grid-cols-1  lg:mt-12 mt-6 gap-4">
        {data?.map((item: any) => (
          <ArticleCard
            href={`/dashboard/our-blog/${item.slug}`}
            key={item.id}
            {...item}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );
}

export default Page;
