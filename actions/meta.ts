"use server";

import prisma from "@/lib/prisma";

function metaById(id: number) {
  return prisma.meta.findUnique({
    where: {
      id,
    },
  });
}

export { metaById };
