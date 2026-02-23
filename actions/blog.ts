"use server";
import prisma from "@/lib/prisma";
import uploadFile from "@/lib/upload-file";
import slugify from "slugify";
import { AuthorType, BlogType } from "@/schema";

const blogUpsert = async (value: BlogType) => {
  const db = prisma.blog;

  const image = await uploadFile(value?.image);

  if (image) {
    value.image = image;
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
        id: value.id,
      },
      data: {
        ...data,
        slug: slugify(value.title["ar"], {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: false,
          strict: false,
          locale: "ar",
          trim: true,
        }),
        relatedBlogs: {
          connect: value.relatedBlogs?.map((id) => ({ id })),
        },
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
        ...data,
        slug: slugify(value.title["ar"], {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: false,
          strict: false,
          locale: "ar",
          trim: true,
        }),
        metaId: meta.id,
        relatedBlogs: {
          connect: value.relatedBlogs?.map((id) => ({ id })),
        },
      },
    });
  }
};
async function blogDelete(id: number) {
  return prisma.blog.delete({
    where: {
      id,
    },
  });
}
function getblog() {
  return prisma.blog.findFirst({
    where: {
      id: 1,
    },
  });
}

function getBlogBySlug(slug: string) {
  return prisma.blog.findFirst({
    where: {
      slug,
    },
    include: {
      relatedBlogs: true,
    },
  });
}

function getAllblogs({
  relatedBlogs = true,
  author = true,
}: {
  relatedBlogs?: boolean;
  author?: boolean;
}) {
  return prisma.blog
    .findMany({
      include: {
        relatedBlogs: relatedBlogs
          ? {
              include: {
                author: true, // Ensures that authors of related blogs are included
              },
            }
          : false,
        author,
      },
    })
    .catch((error) => {
      console.error(error);
      return;
    });
}

const authorUpsert = async (value: AuthorType) => {
  const db = prisma.author;

  const image = await uploadFile(value?.image);

  if (image) {
    value.image = image;
  }

  if (value.id) {
    return db.update({
      where: {
        id: 1,
      },
      data: {
        ...value,
      },
    });
  } else {
    return db.create({
      data: {
        ...value,
      },
    });
  }
};

const authorDelete = async (id: number) => {
  return prisma.author.delete({
    where: {
      id,
    },
  });
};
const getAuthorById = (id: number) => {
  return prisma.author.findFirst({
    where: {
      id,
    },
  });
};

const getAllAuthors = () => {
  return prisma.author.findMany().catch((error) => {
    console.error(error);
    return;
  });
};

export {
  blogUpsert,
  getblog,
  getBlogBySlug,
  getAllblogs,
  authorUpsert,
  getAuthorById,
  getAllAuthors,
  authorDelete,
  blogDelete,
};
