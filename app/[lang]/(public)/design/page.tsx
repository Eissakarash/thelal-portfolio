import { getTranslations } from "next-intl/server";
import React from "react";
import Image from "next/image";
import { Link } from "@/utils/navigation";
import prisma from "@/lib/prisma";
import { Design } from "@/schema";

const DesignPage = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
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
    <div className="min-h-screen">
      <div className="flex flex-col gap-6 md:my-10 md:px-10 md:py-5">
        {values?.map((value: any) => (
          <div key={value.id} className="flex flex-col gap-6  py-5">
            {!!value?.Design.length && (
              <h2 className="md:md:text-[30px] text-[26px] font-bold uppercase ">
                {value.name[lang]}
              </h2>
            )}

            <div className="grid md:grid-cols-4 grid-cols-2 md:gap-10 gap-4">
              {value?.Design?.map((design: Design) => (
                <Link key={design.id} href={`/design/${design.id}`}>
                  <Image
                    width={300}
                    height={300}
                    src={design.thumbnail}
                    alt="section-image"
                    className="w-full h-full aspect-square object-cover"
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignPage;
