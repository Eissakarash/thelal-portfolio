"use server";

import prisma from "@/lib/prisma";
import uploadFile from "@/lib/upload-file";
import { Home } from "@/schema";

const homeUpsert = async (value: Home) => {
  const db = prisma.home;

  const imageUrl = value?.images
    ? await Promise.all(
        value.images
          .filter((image) => image)
          .map((image) =>
            image?.startsWith("https") ? image : uploadFile(image)
          )
      )
    : [];
  const image_1 = await uploadFile(value.image_1);
  const image_2 = await uploadFile(value.image_2);
  const image_3 = await uploadFile(value.image_3);

  if (image_1) {
    value.image_1 = image_1;
  }
  if (image_2) {
    value.image_2 = image_2;
  }
  if (image_3) {
    value.image_3 = image_3;
  }
  if (imageUrl.length > 0) {
    value.images = imageUrl as string[];
  }

  if (value.id) {
    return db.update({
      where: {
        id: +value.id || 1,
      },
      data: {
        ...(value as any),
      },
    });
  } else {
    return db.create({
      data: {
        ...(value as any),
      },
    });
  }
};

export default homeUpsert;
