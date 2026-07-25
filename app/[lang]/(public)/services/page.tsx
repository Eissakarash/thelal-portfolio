import Image, { StaticImageData } from "next/image";
import Cam04 from "@/images/Cam_04.jpg";
import Maquette from "@/images/00-Maquette.jpg";
import ProjectImage from "@/images/01.jpg";
import InteriorImage from "@/images/04_14 - Photo.jpg";

type Service = {
  image: StaticImageData;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
};

const services: Service[] = [
  {
    image: Cam04,
    title: { ar: "التصميم المعماري", en: "Architectural Design" },
    description: {
      ar: "حلول معمارية متوازنة تجمع الهوية والجمال والوظيفة.",
      en: "Balanced architectural solutions shaped by identity, beauty, and function.",
    },
  },
  {
    image: InteriorImage,
    title: { ar: "التصميم الداخلي", en: "Interior Design" },
    description: {
      ar: "مساحات داخلية هادئة ومدروسة تناسب تفاصيل الحياة اليومية.",
      en: "Refined interiors designed around the details of daily life.",
    },
  },
  {
    image: Maquette,
    title: { ar: "إدارة المشاريع", en: "Project Management" },
    description: {
      ar: "إدارة واضحة للمراحل والميزانية والتنسيق حتى التسليم.",
      en: "Clear management of planning, budget, coordination, and delivery.",
    },
  },
  {
    image: ProjectImage,
    title: { ar: "الإشراف والتنفيذ", en: "Supervision & Delivery" },
    description: {
      ar: "متابعة ميدانية دقيقة لتحويل التصميم إلى واقع متقن.",
      en: "Careful on-site supervision that turns design into a precise reality.",
    },
  },
  {
    image: InteriorImage,
    title: { ar: "الدعم الفني", en: "Technical Support" },
    description: {
      ar: "دعم فني مستمر لمعالجة التفاصيل وتسهيل اتخاذ القرار أثناء المشروع.",
      en: "Ongoing technical support that resolves details and simplifies project decisions.",
    },
  },
  {
    image: Cam04,
    title: { ar: "الاستشارات الهندسية", en: "Engineering Consulting" },
    description: {
      ar: "استشارات متخصصة تساعد على بناء رؤية واضحة قبل بدء المشروع.",
      en: "Specialist consulting that creates a clear vision before a project begins.",
    },
  },
];

export default function ServicesPage({
  params: { lang },
}: {
  params: { lang: "ar" | "en" };
}) {
  const isArabic = lang === "ar";

  return (
    <main className="bg-[#f8f7f4] pb-20">
      <section
        className="relative overflow-hidden bg-zinc-950 px-6 py-20 text-white md:px-14 md:py-28"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(17, 17, 17, 0.94), rgba(17, 17, 17, 0.62)), url(${Cam04.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="relative mx-auto max-w-6xl" dir={isArabic ? "rtl" : "ltr"}>
          <p className="mb-4 text-sm tracking-[0.18em] text-[#c88a5b]">
            {isArabic ? "ذلال للهندسة المعمارية" : "THELAL ARCHITECTURE"}
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight md:text-6xl">
            {isArabic ? "خدمات تصنع مساحات لها معنى." : "Services that shape meaningful spaces."}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-14 md:px-14 md:pt-20" dir={isArabic ? "rtl" : "ltr"}>
        <div className="mb-10 flex items-end justify-between gap-6 border-b border-zinc-300 pb-5">
          <div>
            <p className="mb-2 text-sm text-[#aa7048]">
              {isArabic ? "ما نقدمه" : "WHAT WE OFFER"}
            </p>
            <h2 className="text-3xl font-semibold text-zinc-900 md:text-4xl">
              {isArabic ? "خدماتنا" : "Our Services"}
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm leading-6 text-zinc-600 md:block">
            {isArabic
              ? "نعمل من الفكرة الأولى حتى التسليم، بتركيز على التفاصيل والنتيجة النهائية."
              : "From the first idea to final delivery, we focus on the details that make the difference."}
          </p>
        </div>

        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <article key={service.title.en} className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-200">
                <Image
                  src={service.image}
                  alt={service.title[lang]}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <span className="absolute left-0 top-0 bg-[#c88a5b] px-3 py-2 text-xs text-white">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-zinc-900">
                {service.title[lang]}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {service.description[lang]}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
