import React, { HTMLInputTypeAttribute } from "react";
import { FileIcon, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "./button";

interface PdfUploadProps {
  value: string | null;
  onChange: (file: File | null) => void;
}

const PdfUpload = ({
  value,
  onChange,
  ...props
}: PdfUploadProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  const t = useTranslations("common");
  return (
    <div>
      {value ? (
        <div className="p-5">
          <a href={value} target="_blank" rel="noopener noreferrer">
            <FileIcon /> {t("view_PDF")}
          </a>
          <Button onClick={() => onChange(null)}>{t("remove")}</Button>
        </div>
      ) : (
        <div>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                  onChange(e.target.result);
                };
                reader.readAsDataURL(file);
              }
            }}
            {...props}
          />
        </div>
      )}
    </div>
  );
};

export default PdfUpload;
