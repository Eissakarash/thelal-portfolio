"use client";
import { Trash2 } from "lucide-react";

import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "@/utils/navigation";
import { Button, Text } from "@/ui/atoms";
import { Home, HomeSchema } from "@/schema";

import homeUpsert from "@/actions/home";
import { Form } from "@/ui/molecules/form";
import FormUpload from "@/ui/molecules/form-upload";
import FormInput from "@/ui/molecules/form-input";
import { toast } from "sonner";

const HomeForm = ({ values }: { values: any }) => {
  const t = useTranslations("common");

  const [isPending, startTransaction] = useTransition();
  const router = useRouter();

  const form = useForm<Home>({
    resolver: zodResolver(HomeSchema),

    values: {
      ...values,
    },
  });

  const onSubmit = (values: Home) => {
    startTransaction(() => {
      homeUpsert(values)
        .then(() => {
          toast.success(t("save_successfully"));
          router.refresh();
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
          {t("home")}
        </Text>

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
          {t("add_image_to_slider")}
        </Button>
        <hr />
        <div className="space-y-5">
          <FormUpload
            form={form}
            name="image_1"
            label={t("image")}
            className="size-[500px]"
          />
          <FormUpload
            form={form}
            name="image_2"
            label={t("image")}
            className="size-[500px]"
          />
          <FormUpload
            form={form}
            name="image_3"
            label={t("image")}
            className="size-[500px]"
          />

          <FormInput
            form={form}
            name="client"
            label={t("number_of_client")}
            type="number"
          />

          <FormInput
            type="number"
            form={form}
            name="project"
            label={t("number_of_project")}
          />

          <FormInput
            form={form}
            name="aim.ar"
            label={t("ar_", {
              key: t("aim"),
            })}
          />
          <FormInput
            form={form}
            name="aim.en"
            label={t("en_", {
              key: t("aim"),
            })}
          />
          <FormInput form={form} name="location" label={t("location_url")} />
          <FormInput form={form} name="instagram" label={t("instagram")} />
          <FormInput form={form} name="x" label={t("x")} />
          <FormInput form={form} name="whatsapp" label={t("whatsapp")} />
          <FormInput form={form} name="linkedin" label={t("linkedin")} />
          <FormInput form={form} name="mail" label={t("mail")} />

          <FormInput
            form={form}
            name="quote.ar"
            label={t("ar_", {
              key: t("quote"),
            })}
          />
          <FormInput
            form={form}
            name="quote.en"
            label={t("en_", {
              key: t("quote"),
            })}
          />
          <FormUpload
            form={form}
            name="quote_image"
            label={t("quote_image")}
            className="size-[500px]"
          />
          <FormInput
            form={form}
            name="author.ar"
            label={t("ar_", {
              key: t("author"),
            })}
          />
          <FormInput
            form={form}
            name="author.en"
            label={t("en_", {
              key: t("author"),
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

export default HomeForm;
