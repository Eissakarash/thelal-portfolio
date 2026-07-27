"use client";

import { authorDelete, authorUpsert } from "@/actions/blog";
import { AuthorSchema, AuthorType } from "@/schema";
import { useRouter } from "@/utils/navigation";
import { Button, Text } from "@/ui/atoms";
import { Form } from "@/ui/molecules/form";
import FormInput from "@/ui/molecules/form-input";
import FormUpload from "@/ui/molecules/form-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AuthorForm = ({ values }: { values: AuthorType }) => {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("common");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<AuthorType>({
    resolver: zodResolver(AuthorSchema),
    defaultValues: { id: undefined, name: { ar: "", en: "" }, job_title: { ar: "", en: "" }, image: "" },
    values,
  });

  const onSubmit = (formValues: AuthorType) => {
    startTransition(() => {
      authorUpsert(formValues)
        .then(() => {
          toast.success(locale === "ar" ? "تم حفظ العضو" : "Team member saved");
          router.push("/dashboard/team");
          router.refresh();
        })
        .catch((error) => toast.error(error.message));
    });
  };

  const onDelete = () => {
    startTransition(() => {
      authorDelete(values?.id || 0)
        .then(() => {
          toast.success(locale === "ar" ? "تم حذف العضو" : "Team member deleted");
          router.push("/dashboard/team");
          router.refresh();
        })
        .catch((error) => toast.error(error.message));
    });
  };

  return (
    <Form {...form}>
      <div className="mx-auto max-w-4xl space-y-8 py-6 md:py-10">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
          <div>
            <p className="text-sm text-zinc-500">
              {locale === "ar" ? "معلومات عضو الفريق" : "Team member details"}
            </p>
            <Text variant="h2" className="mt-1">
              {values?.name?.[locale] || t("author")}
            </Text>
          </div>
          {values?.id && (
            <Button onClick={onDelete} variant="danger" className="size-10 !px-0" aria-label="Delete team member">
              <Trash2 className="size-4" />
            </Button>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-[220px_1fr] md:items-start">
          <FormUpload
            className="aspect-[4/5] w-full overflow-hidden border border-zinc-200 bg-zinc-50"
            form={form}
            label={t("image")}
            name="image"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <FormInput form={form} label={t("_ar_lang", { key: t("name") })} name="name.ar" type="text" />
            <FormInput form={form} label={t("_en_lang", { key: t("name") })} name="name.en" type="text" />
            <FormInput form={form} label={t("_ar_lang", { key: t("job_title") })} name="job_title.ar" type="text" />
            <FormInput form={form} label={t("_en_lang", { key: t("job_title") })} name="job_title.en" type="text" />
          </div>
        </div>

        <Button
          isLoading={isPending}
          onClick={form.handleSubmit(onSubmit)}
          type="submit"
          className="border-[#b9784d] bg-[#b9784d] text-white hover:bg-[#9c603a] hover:text-white"
        >
          {t("update")}
        </Button>
      </div>
    </Form>
  );
};

export default AuthorForm;
