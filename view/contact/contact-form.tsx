"use client";
import { createContact } from "@/actions/contact";
import { onMailer } from "@/actions/mailer";
import { Contact, contactSchema } from "@/schema";
import { Button } from "@/ui/atoms";
import { Form } from "@/ui/molecules/form";
import FormInput from "@/ui/molecules/form-input";
import FormTextArea from "@/ui/molecules/form-textarea";
import { useRouter } from "@/utils/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function ContactForm() {
  const t = useTranslations("common");
  const router = useRouter();
  const [isPending, startTransaction] = useTransition();
  const form = useForm<Contact>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: Contact) => {
    startTransaction(() => {
      createContact(values)
        .then(async () => {
          await onMailer({
            email: process.env.NEXT_PUBLIC_NODE_MAILER_EMAIL!,
            subject: `${values.name} New Lead`,
            html: `
            <h5>Name: ${values.name} </h5>
            <h5>Email: ${values.email} </h5>
            <h5>Phone: ${values.phone} </h5>
            <p>Subject: ${values.subject} New Lead </p>
            <p>Message: ${values.message} </p>
            `,
          }).catch((error) => {
            console.error("Error sending admin notification email:", error);
          });
          await onMailer({
            email: values.email,
            subject: "Thelal Support",
            html: `
              <p>Thank you ${values.name} for contacting us we will reach you soon </p>
            `,
          }).catch((error) => {
            console.error("Error sending confirmation email:", error);
          });
          toast.success(t("message_send_successfully"));
          router.push("/");
          form.reset();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };
  return (
    <Form {...form}>
      <FormInput form={form} name="name" label={t("name")} />
      <FormInput form={form} name="email" type="email" label={t("email")} />
      <FormInput form={form} name="phone" label={t("phone_number")} />
      <FormInput form={form} name="subject" label={t("company_name")} />
      <FormTextArea form={form} name="message" label={t("message")} />
      <Button
        variant="secondary"
        type="submit"
        className="ms-auto"
        isLoading={isPending}
        onClick={form.handleSubmit(onSubmit)}
      >
        {t("send")}
      </Button>
    </Form>
  );
}

export default ContactForm;
