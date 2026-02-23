import { getAuthorById } from "@/actions/blog";
import AuthorForm from "@/ui/atoms/author-form";

import React from "react";

async function Page({ params: { id } }: { params: { id: string } }) {
  const values = id === "new" ? {} : ((await getAuthorById(+id)) as any);

  return <AuthorForm values={values} />;
}

export default Page;
