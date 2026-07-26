"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import React, { useId, useState } from "react";
import { upload } from "@vercel/blob/client";
import { Button } from "../atoms";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

type Props = {
  onChange: (url?: string) => void;
  value?: string;
  className?: string;
  label?: string;
};

const FileUpload = ({ onChange, value, className, label }: Props) => {
  const t = useTranslations("common");
  const inputId = useId();
  const [isUploading, setIsUploading] = useState(false);
  const normalizedValue = value?.toLowerCase() || "";
  const isPdf = normalizedValue.includes(".pdf") || value?.startsWith("data:application/pdf");
  const isVideo = normalizedValue.includes(".mp4") || value?.startsWith("data:video/");

  if (value) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        {isVideo ? (
          <video className={cn(className, "max-w-full")} controls src={value} />
        ) : !isPdf ? (
          <div className={cn(className, "relative")}>
            <Image
              src={value}
              alt="uploaded image"
              className="object-contain w-full h-full"
              fill
            />
          </div>
        ) : (
          <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
            <FileIcon />
            <a
              href={value}
              target="_blank"
              rel="noopener_noreferrer"
              className="ml-2 text-sm text-primary dark:text-primary-hover hover:underline"
            >
              {t("view_PDF")}
            </a>
          </div>
        )}
        <Button
          onClick={async () => {
            // await removeFile(value);
            toast.info(t("image_removed"));
            onChange("");
          }}
          type="button"
        >
          <X className="w-4 h-4" />
          {t("remove")} {t("image")}
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full bg-muted/30">
      <label
        htmlFor={inputId}
        className="flex items-center justify-center w-full h-40 cursor-pointer"
      >
        <FileIcon className="w-8 h-8" />
        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
          {isUploading ? "Uploading..." : `${t("upload")} ${label || t("image")}`}
        </span>
      </label>
      <input
        id={inputId}
        type="file"
        accept="image/*,video/mp4,.pdf"
        className="hidden"
        disabled={isUploading}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          setIsUploading(true);
          try {
            const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
            const blob = await upload(`thelal/${Date.now()}-${safeName}`, file, {
              access: "public",
              handleUploadUrl: "/api/blob-upload",
              multipart: file.size > 4 * 1024 * 1024,
            });
            onChange(blob.url);
            toast.success("Uploaded successfully");
          } catch (error) {
            console.error(error);
            toast.error("Could not upload this file");
          } finally {
            setIsUploading(false);
            e.target.value = "";
          }
        }}
      />
    </div>
  );
};

export default FileUpload;
