import prisma from "@/lib/prisma";
import { Build } from "@/schema";
import { Button } from "@/ui/atoms";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Trash2Icon } from "lucide-react";
import { buildDelete } from "@/actions/build";
import { redirect } from "next/navigation";
async function BuildPage({ params: { lang } }: { params: { lang: string } }) {
  const t = await getTranslations("common");
  const values = (await prisma.buildCategory
    .findMany({
      include: {
        Build: true,
      },
    })
    .catch((error) => {
      console.error(error);
      return;
    })) as any;
  return (
    <div>
      <div className="flex justify-between">
        <Link href="/dashboard/build/new">
          <Button>
            {t("add_", {
              key: t("build"),
            })}
          </Button>
        </Link>
        <Link href="/dashboard/build/category">
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
            {!!value?.Build.length && (
              <h2 className="md:md:text-[30px] text-[26px] font-bold uppercase ">
                {value.name[lang]}
              </h2>
            )}
            <div className="grid md:grid-cols-4 grid-cols-2 gap-4 md:gap-10">
              {value?.Build?.map((build: Build) => (
                <div key={build.id}>
                  <Link href={`/dashboard/build/${build.id}`}>
                    <Image
                      width={300}
                      height={300}
                      src={build.thumbnail}
                      alt="section-image"
                      className="w-full h-full aspect-square object-cover"
                    />
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      await buildDelete(Number(build?.id));
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

export default BuildPage;
