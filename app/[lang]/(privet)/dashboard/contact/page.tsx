import { getContacts } from "@/actions/contact";
import { Text } from "@/ui/atoms";
import { Link } from "@/utils/navigation";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import React from "react";

async function Contact() {
  const data = await getContacts();
  const t = await getTranslations("common");

  return (
    <div className="space-y-5">
      <Text as="h1">{t("contact")}</Text>
      <div className="flex flex-wrap basis-1/4">
        {data?.map((item: any) => (
          <ContactCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

const ContactCard = ({
  name,
  phone,
  email,
  id,
}: {
  name: string;
  phone: string;
  email: string;
  id: string;
}) => {
  const t = useTranslations("common");
  return (
    <Link
      href={`/dashboard/contact/${id}`}
      className="shadow-md rounded-md p-4 space-y-5 flex flex-col"
    >
      <Text>
        {t("name")}: {name}
      </Text>
      <Text>
        {t("phone")}: {phone}
      </Text>
      <Text>
        {t("email")}: {email}
      </Text>
    </Link>
  );
};

export default Contact;
