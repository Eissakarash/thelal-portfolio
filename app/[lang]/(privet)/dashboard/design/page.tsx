import prisma from "@/lib/prisma";
import { Build } from "@/schema";
import { Button } from "@/ui/atoms";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { Trash2Icon } from "lucide-react";
import { designDelete } from "@/actions/design";
async function DesignPage({ params: { lang } }: { params: { lang: string } }) {
  const t = await getTranslations("common");
  const values = (await prisma.designCategory
    .findMany({
      include: {
        Design: true,
      },
    })
    .catch((error) => {
      console.error(error);
      return;
    })) as any;

  return (
    <div>
      <div className="flex justify-between">
        <Link href="/dashboard/design/new">
          <Button>
            {t("add_", {
              key: t("design"),
            })}
          </Button>
        </Link>
        <Link href="/dashboard/design/category">
          <Button>
            {t("add_", {
              key: t("category"),
            })}
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-6 my-10 px-10 py-5">
        {values?.map((value: any) => (
          <div key={value.id} className="flex flex-col gap-6  py-5">
            {!!value?.Design.length && (
              <h2 className="md:md:text-[30px] text-[26px] font-bold uppercase ">
                {value.name[lang]}
              </h2>
            )}
            <div className="grid md:grid-cols-4 grid-cols-2 gap-4 md:gap-10">
              {value?.Design?.map((design: Build) => (
                <div key={design.id}>
                  <Link href={`/dashboard/design/${design.id}`}>
                    <Image
                      width={300}
                      height={300}
                      src={design.thumbnail}
                      alt="section-image"
                      className="w-full h-full aspect-square object-cover"
                    />
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      await designDelete(Number(design?.id));
                      redirect("/dashboard/build");
                    }}
                  >
                    <Button type="submit">
                      <Trash2Icon className="text-red-500" />
                    </Button>
                  </form>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DesignPage;
