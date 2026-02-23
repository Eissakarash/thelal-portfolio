"use server";

import prisma from "@/lib/prisma";
import { Contact } from "@/schema";

const createContact = async (value: Contact) => {
  return prisma.contact.create({
    data: {
      name: value.name,
      email: value.email,
      phone: value.phone,
      message: value.message,
    },
  });
};

const getContacts = async () => {
  return prisma.contact.findMany().catch((error) => {
    console.error(error);
    return;
  });
};

const getContact = async (id: number) => {
  return prisma.contact.findUnique({
    where: {
      id,
    },
  });
};

const contactRead = async (id: number) => {
  return prisma.contact.update({
    where: {
      id,
    },
    data: {
      isRead: true,
    },
  });
};
const contactDelete = async (id: number) => {
  return prisma.contact.delete({
    where: {
      id,
    },
  });
};

export { contactDelete, contactRead, createContact, getContact, getContacts };
