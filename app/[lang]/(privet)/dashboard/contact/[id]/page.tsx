import { contactRead, getContact } from "@/actions/contact";
import { Button, Text } from "@/ui/atoms";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import React from "react";

async function ContactDetails({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const t = await getTranslations("common");
  const data = await getContact(+id);
  return (
    <div className="p-5 flex flex-col space-y-5">
      {data?.isRead ? (
        <Text className="bg-green-500 w-fit rounded-lg p-2 text-white">
          {t("readd")}
        </Text>
      ) : (
        <form
          action={async () => {
            "use server";
            contactRead(+id);
            redirect("/dashboard/contact");
          }}
        >
          <Button type="submit"> {t("mark_as_reade")} </Button>
        </form>
      )}

      <Text>
        <strong>{t("name")} :</strong>
        {data?.name}
      </Text>
      <Text>
        <strong>{t("phone")} :</strong>
        {data?.phone}
      </Text>
      <Text>
        <strong>{t("email")} :</strong>
        {data?.email}
      </Text>
      <Text className="border rounded-md p-2">
        <strong>{t("message")} :</strong>
        <br /> {data?.message}
      </Text>
    </div>
  );
}

export default ContactDetails;
