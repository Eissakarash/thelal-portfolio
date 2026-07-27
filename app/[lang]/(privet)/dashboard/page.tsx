import prisma from "@/lib/prisma";
import HomeForm from "@/view/forms/home";
import { ArrowRight, Building2, ImageIcon, Mail, Newspaper, Palette, UsersRound } from "lucide-react";
import { Link } from "@/utils/navigation";

import React from "react";

async function Dashboard() {
  const values = await prisma.home.findFirst().catch((error) => {
    console.error(error);
    return;
  });
  const sections = [
    { href: "/dashboard", title: "Home page", description: "Hero slider, home images, statistics, quote, and social links.", icon: ImageIcon, accent: "bg-[#f2dfcb] text-[#8d5937]" },
    { href: "/dashboard/design", title: "Design portfolio", description: "Architecture and interior design projects shown on the Design page.", icon: Palette, accent: "bg-[#e8e7df] text-[#665d50]" },
    { href: "/dashboard/build", title: "Projects", description: "Completed build projects, categories, and project photos.", icon: Building2, accent: "bg-[#e5eee9] text-[#426452]" },
    { href: "/dashboard/contact", title: "Messages", description: "Messages sent from the Contact page.", icon: Mail, accent: "bg-[#e8edf3] text-[#4d627c]" },
    { href: "/dashboard/our-blog", title: "Blog", description: "News, articles, and publication images.", icon: Newspaper, accent: "bg-[#f1e7dc] text-[#845d3d]" },
    { href: "/dashboard/team", title: "Team", description: "Team member names, roles, and professional photos.", icon: UsersRound, accent: "bg-[#efe7eb] text-[#80536a]" },
  ];

  return (
    <div className="space-y-8">
      <section className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a86f44]">Content workspace</p>
        <h2 className="mt-2 text-3xl font-semibold text-[#29261f] md:text-4xl">Choose what you want to update</h2>
        <p className="mt-3 max-w-2xl leading-7 text-[#655e55]">Each section tells you exactly where its content appears on the website and the recommended image size before you upload.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.href} href={section.href} className="group rounded-md border border-[#ddd3c7] bg-[#fbf8f2] p-5 transition hover:-translate-y-0.5 hover:border-[#bf875d] hover:shadow-lg hover:shadow-[#8e67451a]">
              <div className="flex items-start justify-between gap-4">
                <span className={`rounded-md p-3 ${section.accent}`}><Icon size={22} /></span>
                <ArrowRight size={18} className="mt-1 text-[#a86f44] transition group-hover:translate-x-1" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-[#29261f]">{section.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#70685e]">{section.description}</p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#a86f44]">Open section</p>
            </Link>
          );
        })}
      </section>

      <section className="rounded-md border border-[#d9cbbd] bg-[#f0e7db] p-5 text-sm leading-7 text-[#594e43]">
        <strong className="text-[#352b22]">Before uploading an image:</strong> use JPG or WebP, avoid text inside the photo, and keep the original high-quality file. The exact recommended size is displayed in each section.
      </section>

      <div className="border-t border-[#ded4c6] pt-8">
        <HomeForm values={values} />
      </div>
    </div>
  );
}

export default Dashboard;
