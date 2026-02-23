"use client";
import { Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/utils/navigation";
import { Button, Text } from "@/ui/atoms";
import { Build, BuildSchema, Category } from "@/schema";
import FormUpload from "@/ui/molecules/form-upload";
import FormInput from "@/ui/molecules/form-input";
import { toast } from "sonner";
import { buildUpsert } from "@/actions/build";
import { Form } from "@/ui/molecules/form";
import FormSelect from "@/ui/molecules/form-select";
import FormTextArea from "@/ui/molecules/form-textarea";

const BuildForm = ({
  values,
  category,
}: {
  values: any;
  category: Category[];
}) => {
  const lang = useLocale();
  const t = useTranslations("common");

  const [isPending, startTransaction] = useTransition();
  const router = useRouter();

  const form = useForm<Build>({
    resolver: zodResolver(BuildSchema),

    values: {
      ...values,
    },
  });

  const onSubmit = (values: Build) => {
    startTransaction(() => {
      buildUpsert(values)
        .then(() => {
          toast.success(t("save_successfully"));
          router.push("/dashboard/build");
          form.reset();
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
          {values?.title?.[lang] ||
            t("add_", {
              key: t("build"),
            })}
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
        <div className="grid  grid-cols-1 lg:grid-cols-3 gap-10 w-full items-center">
          {form.getValues("images")?.map((_phone, index) => (
            <div className="flex-1 w-full flex flex-col gap-6" key={index}>
              <FormUpload
                className="w-full min-h-[350px]"
                form={form}
                label={t("images") + " " + (+index + 1)}
                name={`images[${index}]`}
              />
              <Button
                className="bg-red-500 text-white p-2 rounded-sm text-center mt-5"
                onClick={() => {
                  startTransaction(() => {
                    form.setValue(`images[${index}]` as any, "");

                    const images = form.getValues("images");
                    const newPhones = images
                      .filter((images, i) => images !== "")
                      .filter((images) => images);

                    form.setValue("images", newPhones);
                  });
                }}
              >
                <span className="flex items-center gap-2 justify-center">
                  {t("remove")} {t("image")}
                  <Trash2 />
                </span>
              </Button>
            </div>
          ))}
        </div>
        <Button
          isLoading={isPending}
          onClick={() => {
            startTransaction(() =>
              form.setValue(
                `images[${form.getValues("images")?.length || 0}]` as any,
                ""
              )
            );
          }}
        >
          {t("add_", {
            key: t("image"),
          })}
        </Button>
        <hr />

        <div className="space-y-5">
          <FormSelect
            form={form}
            name="buildCategoryId"
            label={t("category")}
            options={category.map((category: Category) => ({
              value: category.id,
              label: category.name[lang as "ar" | "en"],
            }))}
          />
          <FormInput form={form} name="year" label={t("year")} />
          <FormInput
            form={form}
            name="title.ar"
            label={t("ar_", {
              key: t("title"),
            })}
          />
          <FormInput
            form={form}
            name="title.en"
            label={t("en_", {
              key: t("title"),
            })}
          />

          <FormInput
            form={form}
            name="status.ar"
            label={t("ar_", {
              key: t("status"),
            })}
          />
          <FormInput
            form={form}
            name="status.en"
            label={t("en_", {
              key: t("status"),
            })}
          />
          <FormInput
            form={form}
            name="location.ar"
            label={t("ar_", {
              key: t("location"),
            })}
          />
          <FormInput
            form={form}
            name="location.en"
            label={t("en_", {
              key: t("location"),
            })}
          />
          <FormInput
            form={form}
            name="scope.ar"
            label={t("ar_", {
              key: t("scope"),
            })}
          />
          <FormInput
            form={form}
            name="scope.en"
            label={t("en_", {
              key: t("scope"),
            })}
          />
          <FormInput
            form={form}
            name="team.ar"
            label={t("ar_", {
              key: t("team"),
            })}
          />
          <FormInput
            form={form}
            name="team.en"
            label={t("en_", {
              key: t("team"),
            })}
          />
          <FormUpload
            form={form}
            name="briefing_image"
            label={t("briefing_image")}
            className="size-[500px]"
          />
          <FormTextArea
            form={form}
            name="briefing.ar"
            label={t("ar_", {
              key: t("briefing"),
            })}
          />
          <FormTextArea
            form={form}
            name="briefing.en"
            label={t("en_", {
              key: t("briefing"),
            })}
          />

          <FormUpload
            form={form}
            name="architectural_solution_image"
            label={t("architectural_solution_image")}
            className="size-[500px]"
          />
          <FormTextArea
            form={form}
            name="architectural_solution.ar"
            label={t("ar_", {
              key: t("architectural_solution"),
            })}
          />
          <FormTextArea
            form={form}
            name="architectural_solution.en"
            label={t("en_", {
              key: t("architectural_solution"),
            })}
          />
        </div>
        <div className="flex  gap-5">
          <Button
            isLoading={isPending}
            onClick={form.handleSubmit(onSubmit)}
            type="submit"
          >
            {t("save")}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default BuildForm;
