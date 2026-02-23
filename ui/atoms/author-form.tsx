"use client";
import { AuthorSchema, AuthorType } from "@/schema";
import { Button, Text } from "@/ui/atoms";
import FormUpload from "@/ui/molecules/form-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import React, { useTransition } from "react";
import { toast } from "sonner";
import FormInput from "@/ui/molecules/form-input";
import { useRouter } from "@/utils/navigation";
import { authorDelete, authorUpsert } from "@/actions/blog";
import { Trash2 } from "lucide-react";
import { Form } from "../molecules/form";

const AuthorForm = ({ values }: { values: AuthorType }) => {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("common");
  const [isPending, startTransaction] = useTransition();
  const router = useRouter();
  const form = useForm<AuthorType>({
    resolver: zodResolver(AuthorSchema),
    defaultValues: {
      id: undefined,
      name: {
        ar: "",
        en: "",
      },
      job_title: {
        ar: "",
        en: "",
      },
      image: "",
    },
    values,
  });

  const onSubmit = (values: AuthorType) => {
    startTransaction(() => {
      authorUpsert(values)
        .then(() => {
          toast.success("updated successfully");
          router.push("/dashboard/team");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };

  const onDelete = () => {
    startTransaction(() => {
      authorDelete(values?.id || 0)
        .then(() => {
          toast.success("deleted successfully");
          router.push("/dashboard/team");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };

  return (
    <Form {...form}>
      <div className="space-y-4">
        <Text variant="h2" className="flex gap-2 items-baseline">
          {values?.name && (
            <Button onClick={onDelete} variant="danger">
              <Trash2 />
            </Button>
          )}
          {values?.name?.[locale] || t("author")}{" "}
        </Text>

        <FormUpload
          className="w-full size-[200px]  overflow-hidden"
          form={form}
          label={t("image")}
          name="image"
        />

        <FormInput
          form={form}
          label={t("_ar_lang", {
            key: t("name"),
          })}
          name="name.ar"
          type="text"
        />
        <FormInput
          form={form}
          label={t("_en_lang", {
            key: t("name"),
          })}
          name="name.en"
          type="text"
        />

        <FormInput
          form={form}
          label={t("_ar_lang", {
            key: t("job_title"),
          })}
          name="job_title.ar"
          type="text"
        />

        <FormInput
          form={form}
          label={t("_en_lang", {
            key: t("job_title"),
          })}
          name="job_title.en"
          type="text"
        />

        <Button
          isLoading={isPending}
          width={"full"}
          onClick={form.handleSubmit(onSubmit)}
          type="submit"
        >
          {t("update")}
        </Button>
      </div>
    </Form>
  );
};

export default AuthorForm;
