import { ImageIcon, Info } from "lucide-react";
import type React from "react";

type ContentGuideProps = {
  title: string;
  description: string;
  size: string;
  format?: string;
};

export default function ContentGuide({
  title,
  description,
  size,
  format = "JPG, WebP or PNG",
}: ContentGuideProps) {
  return (
    <aside className="rounded-md border border-[#dcc6b0] bg-[#fffaf3] p-4 text-sm text-[#51483f]">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-sm bg-[#ead2b9] p-2 text-[#8a5735]">
          <ImageIcon size={18} />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-[#2d2923]">{title}</h3>
          <p className="mt-1 leading-6 text-[#6d6256]">{description}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
            <span className="rounded-full bg-[#f0e2d3] px-3 py-1 text-[#7a4d2e]">Recommended: {size}</span>
            <span className="rounded-full bg-[#efede7] px-3 py-1 text-[#5e574f]">{format}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function ContentNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-md border border-[#d8dfdf] bg-[#f4f8f7] px-4 py-3 text-sm leading-6 text-[#48534f]">
      <Info size={18} className="mt-0.5 shrink-0 text-[#7c5234]" />
      <p>{children}</p>
    </div>
  );
}
