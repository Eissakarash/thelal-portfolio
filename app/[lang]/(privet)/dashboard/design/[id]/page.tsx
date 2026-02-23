import { getAllCategories, getDesign } from "@/actions/design";
import { metaById } from "@/actions/meta";
import DesignForm from "@/view/forms/design";

import React from "react";

async function DesignF({ params: { id } }: { params: { id: string } }) {
  let values = id === "new" ? ({} as any) : await getDesign(+id);
  if (values?.metaId) {
    values.meta = await metaById(+values.metaId);
  }

  const category = (await getAllCategories()) as any;
  return <DesignForm values={values} category={category} />;
}

export default DesignF;
