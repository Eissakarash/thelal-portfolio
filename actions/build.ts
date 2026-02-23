"use server";

import prisma from "@/lib/prisma";
import uploadFile from "@/lib/upload-file";
import { Build, Category } from "@/schema";

const buildUpsert = async (value: Build) => {
  const db = prisma.build;

  const imageUrl = value?.images
    ? await Promise.all(
        value.images
          .filter((image) => image)
          .map((image) =>
            image?.startsWith("https") ? image : uploadFile(image)
          )
      )
    : [];

  const architectural_solution_image = await uploadFile(
    value.architectural_solution_image
  );
  const briefing_image = await uploadFile(value.briefing_image);

  if (architectural_solution_image) {
    value.architectural_solution_image = architectural_solution_image;
  }
  if (briefing_image) {
    value.briefing_image = briefing_image;
  }

  if (imageUrl.length > 0) {
    value.images = imageUrl as string[];
  }

  const { meta, metaId, ...data } = value;
  if (value.id) {
    // Create metadata first
    await prisma.meta.update({
      where: {
        id: metaId,
      },
      data: {
        ...meta,
      },
    });

    return db.update({
      where: {
        id: +value.id,
      },
      data: {
        ...(data as any),
      },
    });
  } else {
    // Create metadata first
    const meta = await prisma.meta.create({
      data: {
        ...value.meta,
      },
    });
    return db.create({
      data: {
        ...(data as any),
        metaId: meta.id,
      },
    });
  }
};

const buildDelete = async (id: number) => {
  return prisma.build.delete({
    where: {
      id,
    },
  });
};

const getBuilds = async () => {
  return prisma.build.findMany().catch((error) => {
    console.error(error);
    return;
  });
};

const getBuild = async (id: number) => {
  return prisma.build.findUnique({
    where: {
      id,
    },
  });
};

const categoryUpsert = async (value: Category) => {
  const db = prisma.buildCategory;

  if (value.id) {
    return db.update({
      where: {
        id: +value.id,
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

const categoryDelete = async (id: number) => {
  return prisma.buildCategory.delete({
    where: {
      id,
    },
  });
};
const getAllCategories = async () => {
  return prisma.buildCategory.findMany().catch((error) => {
    console.error(error);
    return;
  });
};
export {
  buildUpsert,
  buildDelete,
  getBuilds,
  getBuild,
  categoryUpsert,
  categoryDelete,
  getAllCategories,
};
