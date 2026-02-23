"use client";
import {
  categoryDelete,
  categoryUpsert,
  getAllCategories,
} from "@/actions/design";

import { useTranslations } from "next-intl";
import React, { useEffect, useTransition } from "react";
import { toast } from "sonner";
import { TrashIcon, Edit2Icon } from "lucide-react";
import { Button } from "@/ui/atoms";
import { Category, categorySchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "@/ui/molecules/form-input";
import { Form } from "@/ui/molecules/form";
import { useForm } from "react-hook-form";
import { useRouter } from "@/utils/navigation";
function CategoryForm() {
  const t = useTranslations("common");
  const [isPending, startTransaction] = useTransition();
  const [values, setValues] = React.useState<Category[]>([]);
  const [editValue, setEditValue] = React.useState<Category>({} as any);
  const router = useRouter();
  const form = useForm<Category>({
    resolver: zodResolver(categorySchema),
    values: {
      ...editValue,
    },
  });

  useEffect(() => {
    getAllCategories().then((values) => {
      setValues(values as any);
    });
  }, [isPending]);

  const onSubmit = (values: Category) => {
    startTransaction(() => {
      categoryUpsert(values as any).then(() => {
        toast.success(t("save_successfully"));
        router.refresh();
        form.reset();
      });
    });
  };

  return (
    <div className="space-y-10">
      <div className="flex gap-4 flex-wrap">
        {values?.map((value) => (
          <div
            key={value.id}
            onClick={() => {
              setEditValue(value);
            }}
            className="p-2 text-center bg-gray-100 rounded-md flex justify-between items-center gap-4 cursor-pointer"
          >
            <div className="flex flex-col items-start">
              <span>- {value.name.ar}</span>
              <span>- {value.name.en}</span>
            </div>

            <div className="flex gap-4">
              <Button
                isLoading={isPending}
                className="p-2 bg-red-500 rounded-md text-white"
                onClick={() => {
                  toast(t("this_action_is_not_reversible"), {
                    action: {
                      label: t("delete"),
                      onClick: () =>
                        startTransaction(() =>
                          categoryDelete(value.id as number).then(() => {
                            toast.success(t("delete_successfully"));
                          })
                        ),
                    },
                  });
                }}
              >
                <TrashIcon className="size-4" />
              </Button>

              <Button
                className="p-2 bg-green-500 rounded-md text-white"
                onClick={() => {
                  setEditValue(value);
                }}
              >
                <Edit2Icon className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Form {...form}>
        <FormInput
          form={form}
          name="name.ar"
          label={t("ar_", {
            key: t("name"),
          })}
        />

        <FormInput
          form={form}
          name="name.en"
          label={t("en_", {
            key: t("name"),
          })}
        />

        <Button
          isLoading={isPending}
          onClick={form.handleSubmit(onSubmit)}
          type="submit"
        >
          {t("save")}
        </Button>
      </Form>
    </div>
  );
}

export default CategoryForm;
