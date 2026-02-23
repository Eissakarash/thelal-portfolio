"use client";
import { useTranslations } from "next-intl";
import React from "react";

import { Button, Text } from "@/ui/atoms";
import { Link } from "@/utils/navigation";

function Error500({ reset, error }: { reset: () => void; error?: any }) {
  const t = useTranslations("common");

  return (
    <section className="flex flex-col justify-center items-center gap-8 py-8">
      <div className="error-img-container">
        {/* <ErrorIcon className="w-full h-full" /> */}
      </div>

      <div className="flex justify-center gap-10 items-center flex-col">
        <Text as="h1" color="primary" variant="h1" weight="bold">
          {t("error500")}
        </Text>

        <Text as="p" weight="bold" className="error-desc">
          {t("description500")}
        </Text>
        <div className="flex gap-16">
          <Link href="/">
            <Button
              variant="primary"
              className="button is-danger is-rounded w-[190px]"
            >
              {t("back")}
            </Button>
          </Link>

          <Button
            onClick={() => reset()}
            variant="primary"
            className="button is-danger is-rounded  w-[190px]"
          >
            {t("rest")}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Error500;
