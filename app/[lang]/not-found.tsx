"use client";
import React from "react";
// import NotFoundImg from "@/svg/not_found_img.svg";
import { Link } from "@/utils/navigation";
import { useTranslations } from "next-intl";
import { Button, Text } from "@/ui/atoms";

const NotFound = () => {
  const t = useTranslations("common");

  return (
    <>
      <head>
        <title>{`${t("meta.title")} | ${t("common.error404")}`}</title>
        <meta name="description" content={t("common.description404")} />
      </head>
      <body className="flex flex-col gap-9">
        {/* <NotFoundImg alt="404" /> */}

        <div className="flex flex-col gap-4 justify-center items-center">
          <Text as="h1" color="primary" weight="bold" variant="h1">
            {t("error404")}
          </Text>

          <Text as="p" color="gray" variant="p" weight="semibold">
            {t("description404")}
          </Text>
          <Link className="button is-danger is-rounded" href="/">
            <Button variant="primary">{t("back")}</Button>
          </Link>
        </div>
      </body>
    </>
  );
};

export default NotFound;
