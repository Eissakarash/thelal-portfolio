import { getAllCategories, getBuild } from "@/actions/build";
import { metaById } from "@/actions/meta";
import BuildForm from "@/view/forms/build";

import React from "react";

async function Dashboard({ params: { id } }: { params: { id: string } }) {
  let values = id === "new" ? ({} as any) : await getBuild(+id);
  if (values?.metaId) {
    values.meta = await metaById(+values.metaId);
  }

  const category = (await getAllCategories()) as any;
  return <BuildForm values={values} category={category} />;
}

export default Dashboard;
