"use client";
import { Trash2 } from "lucide-react";
import { BlogSchema, BlogType } from "@/schema";
import { Button, Text } from "@/ui/atoms";
import FormUpload from "@/ui/molecules/form-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import React, { useTransition } from "react";
import { toast } from "sonner";
import FormInput from "@/ui/molecules/form-input";
import FormTextArea from "@/ui/molecules/form-textarea";
import FormEditor from "@/ui/molecules/form-editor";
import { useRouter } from "@/utils/navigation";
import { blogDelete, blogUpsert } from "@/actions/blog";
import FormSelect from "@/ui/molecules/form-select";
import { Author, Blog } from "@prisma/client";
import { Form } from "@/ui/molecules/form";
import FormDate from "@/ui/molecules/form-date";

const BlogForm = ({
  values,
  author,
  allBlogs,
}: {
  values: BlogType;
  author: Author[];
  allBlogs: Blog[];
}) => {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("common");
  const [isPending, startTransaction] = useTransition();
  const router = useRouter();
  const form = useForm<BlogType>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      id: undefined,
    },
    values,
  });

  const onSubmit = (values: BlogType) => {
    startTransaction(() => {
      blogUpsert(values)
        .then(() => {
          toast.success("updated successfully");
          router.push("/dashboard/our-blog");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };

  const onDelete = () => {
    startTransaction(() => {
      blogDelete(values.id || 0)
        .then(() => {
          toast.success("updated successfully");
          router.push("/dashboard/our-blog");
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
          {values?.title && (
            <Button onClick={onDelete}>
              <Trash2 />
            </Button>
          )}
          {values?.title?.[locale] || t("new_blog")}
        </Text>
        <FormUpload
          className="w-full min-h-[150px]"
          form={form}
          label={t("thumbnail")}
          name="thumbnail"
        />
        <div className="space-y-4 pb-10">
          <FormInput
            form={form}
            name="meta.title.ar"
            label={t("ar_", {
              key: t("meta_title"),
            })}
          />
          <FormInput
            form={form}
            name="meta.title.en"
            label={t("en_", {
              key: t("meta_title"),
            })}
          />

          <FormInput
            form={form}
            name="meta.description.ar"
            label={t("ar_", {
              key: t("meta_description"),
            })}
          />
          <FormInput
            form={form}
            name="meta.description.en"
            label={t("en_", {
              key: t("meta_description"),
            })}
          />
          <hr />
        </div>

        <FormUpload
          className="w-full min-h-[350px]"
          form={form}
          label={t("image")}
          name="image"
        />

        <FormInput
          form={form}
          label={t("_ar_lang", {
            key: t("title"),
          })}
          name="title.ar"
        />
        <FormInput
          form={form}
          label={t("_en_lang", {
            key: t("title"),
          })}
          name="title.en"
        />

        <FormDate form={form} label={t("date")} name="date" />

        <FormTextArea
          form={form}
          label={t("_ar_lang", {
            key: t("description"),
          })}
          name="description.ar"
        />

        <FormTextArea
          form={form}
          label={t("_en_lang", {
            key: t("description"),
          })}
          name="description.en"
        />

        <FormSelect
          options={author.map((item) => ({
            value: item.id,
            // @ts-ignore
            label: item?.name?.[locale],
          }))}
          form={form}
          label={t("author")}
          name="authorId"
        />

        <FormSelect
          options={allBlogs.map((item) => ({
            value: item.id,
            // @ts-ignore
            label: item.title[locale],
          }))}
          form={form}
          label={t("related_blogs")}
          name="relatedBlogs"
          isMulti
        />

        <FormEditor
          form={form}
          label={t("_ar_lang", {
            key: t("content"),
          })}
          name="content.ar"
          placeholder={t("content")}
        />
        <FormEditor
          form={form}
          label={t("_en_lang", {
            key: t("content"),
          })}
          name="content.en"
          placeholder={t("content")}
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

export default BlogForm;
