"use server";
import { del, put } from "@vercel/blob";

async function uploadFile(
  item: string | undefined
): Promise<string | undefined> {
  if (!item) return undefined;

  const imageType = item?.split(";")[0].split("/")[1];

  const data = await fetch(item);

  const blob = await data?.blob();

  const file = new File([blob], "m1-group-attachment", { type: imageType });

  const { url } = await put("m1-group-attachment", file, {
    access: "public",
  });

  return url;
}

export default uploadFile;

async function removeFile(item: string) {
  try {
    await del(item);
  } catch (error) {
    console.log("error >>>> ", error);
  }
}

export { removeFile };
