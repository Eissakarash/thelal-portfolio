import { getAllAuthors, getAllblogs, getBlogBySlug } from "@/actions/blog";

import React from "react";
import BlogForm from "@/view/forms/blog-form";
import { metaById } from "@/actions/meta";

async function Page({ params: { slug } }: { params: { slug: string } }) {
  let values =
    slug === "new" ? ({} as any) : ((await getBlogBySlug(slug)) as any);
  if (values?.metaId) {
    values.meta = await metaById(+values.metaId);
  }

  const author = await getAllAuthors();
  const allBlogs = (await getAllblogs({
    author: false,
    relatedBlogs: false,
  })) as any;

  return (
    <BlogForm values={values} author={author as any} allBlogs={allBlogs} />
  );
}

export default Page;
