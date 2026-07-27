import prisma from "@/lib/prisma";
import { Build } from "@/schema";
import { Button } from "@/ui/atoms";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { FolderPlus, ImagePlus, Palette, Trash2Icon } from "lucide-react";
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
    <div className="space-y-8">
      <section className="rounded-md border border-[#ded4c6] bg-[#fbf8f2] p-6 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-[#a86f44]"><Palette size={21} /><span className="text-xs font-semibold uppercase tracking-[0.14em]">Portfolio manager</span></div>
            <h2 className="mt-3 text-3xl font-semibold text-[#29261f]">Design portfolio</h2>
            <p className="mt-3 leading-7 text-[#665f56]">Add a category first, then create a project inside it. The project cover image is what clients see first on the Design page.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/design/category"><Button className="gap-2"><FolderPlus size={17} /> Add category</Button></Link>
            <Link href="/dashboard/design/new"><Button className="gap-2 bg-[#29261f] text-white hover:bg-[#a86f44] hover:text-white"><ImagePlus size={17} /> Add project</Button></Link>
          </div>
        </div>
        <div className="mt-6 grid gap-3 border-t border-[#e2d8ca] pt-5 text-sm text-[#62594f] md:grid-cols-3">
          <p><strong className="text-[#312d27]">1. Category:</strong> for example, Villas or Office design.</p>
          <p><strong className="text-[#312d27]">2. Project:</strong> add its cover image and details.</p>
          <p><strong className="text-[#312d27]">3. Gallery:</strong> upload 4-8 images at 1600 x 1200 px.</p>
        </div>
      </section>
      <div className="flex flex-col gap-6">
        {values?.map((value: any) => (
          <div key={value.id} className="rounded-md border border-[#ded4c6] bg-[#fbf8f2] p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-[#2c2923]">{value.name[lang]}</h2>
              <span className="rounded-full bg-[#eee4d8] px-3 py-1 text-xs font-medium text-[#80583c]">{value?.Design?.length || 0} projects</span>
            </div>
            <div className="grid md:grid-cols-4 grid-cols-2 gap-4 md:gap-10">
              {value?.Design?.map((design: Build) => (
                <div key={design.id}>
                  <Link href={`/dashboard/design/${design.id}`}>
                    <Image
                      width={300}
                      height={300}
                      src={design.thumbnail}
                      alt="section-image"
                      className="aspect-[16/10] w-full rounded-sm object-cover"
                    />
                  </Link>
                  <form className="mt-2"
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
